import { Cthulhu } from "cthulhu";
import { pascalOrCamelToKebab } from '@keltoi/naming-converting';

const cloneByEntry = (obj) => {
    const copy = {}

    const isObjectOrValue = (v) => v instanceof Function
        ? v 
        : v instanceof Object 
            ? cloneByEntry(v) 
            : v 

    Object
    .entries(obj)
    .forEach(([key, value]) => 
        copy[key] = value instanceof Array 
            ? value.map(isObjectOrValue) 
            : isObjectOrValue(value)
    );

    return copy
}

const toMap = (o) => new Map(Object.entries(o))

export class Doom extends Cthulhu{
    #self;
    #old;
    #toRemove=false;
    #root=false;
    #rendered = false

    get root(){return this.#root}
    set root(value=false){this.#root = value}

    get isRendered(){ return this.#rendered } //if the element has been rendered

    get isVirgin(){ return !this.#old } //if the element has never been built

    get isDeleted(){ return this.#toRemove } //if the element has been deleted

    constructor(me){
        super(Doom,me,"content","attributes","events","styleProps","props","nsuri","ai")
    }

    static async $(tag='',me){
        const doomInstance = await (new Doom(me)).build(tag)

        doomInstance.root=true
        
        return doomInstance;
    }

    static async compare({
        oldMap=new Map(),
        newMap=new Map(),
        set=(key,val)=>{},
        remove=(key,val)=>{}
    }){
        newMap.forEach((val,key)=>{
            if (oldMap.has(key)){
                if (oldMap.get(key)!=val) set(key,val)
                oldMap.delete(key)
            } else set(key,val)
        })

        oldMap.forEach((val,key)=>remove(key,val))
    }

    #addAiComment = async (ai='',node = document.createElement())=>{
        const comment = document
            .createComment(`AI:::${ai}`)

        node.appendChild(comment)
    }

    #setAttributes = async (node=document.createElement())=>{
        const newMap = toMap(this.attributes)

        if (this.#old?.has('attributes')){
            const oldMap = toMap(this.#old.get('attributes'))

            await Doom.compare({
                oldMap,
                newMap,
                set:(key,val)=>node.setAttribute(pascalOrCamelToKebab(key),val),
                remove:(key)=>{
                    if (key!='style') node.removeAttribute(pascalOrCamelToKebab(key))
                }
            })
        }
        else newMap.forEach((val,attr)=>node.setAttribute(pascalOrCamelToKebab(attr),val))
    }

    #setEvents= async(node=document.createElement())=>{
        const newMap = toMap(this.events)

        if (this.#old?.has('events')){
            const oldMap = toMap(this.#old.get('events'))

            await Doom.compare({
                oldMap,
                newMap,
                set:(key,val)=>{
                    val.forEach(e=>node.addEventListener(key,e))
                },
                remove:(key,val)=>{
                    try{
                        val.forEach(e=>node.removeEventListener(key,e))
                    } finally {
                        return
                    }
                }
            })
        }
        else newMap.forEach((val,eve)=>val.forEach(e=>node.addEventListener(eve,e)))
    }

    #setStyle= async (node=document.createElement())=>{
        const newMap = toMap(this.styleProps)

        if (this.#old?.has('styleProps')){
            const oldMap = toMap(this.#old.get('styleProps'))

            await Doom.compare({
                oldMap,
                newMap,
                set:(key,val)=>node.style[key]=val,
                remove:(key)=>node.style[key]=''
            })
        }
        else newMap.forEach((val,sty)=>node.style[sty]=val)
    }

    #setContent= async(node=document.createElement())=>{
        if (this.#old?.has('content')){
            if (this.#old.get('content')!==this.content){
                node.innerHTML = this.content
            } 
        } else node.innerHTML = this.content
    }

    #dealWithList=(parent,element=[],previous={}|[])=>{
        if (previous instanceof Array){
            const indexes = element.map(e=>e.index ?? -1)

            previous.forEach(prev=>{
                if (!indexes.includes(prev.index))
                    prev.removeFrom(parent)
            })
        }
        else previous.removeFrom(parent)
    }

    #inner=(e, update = false)=>{
        const self = new Map(Object.entries(this))
        let children=[];
        let structure = [];
        let garbage = [];

        self.forEach((element,prop)=>{
            switch(prop){
                case 'attributes':structure.push(this.#setAttributes(e));break;
                case 'events':structure.push(this.#setEvents(e));break;
                case 'styleProps':structure.push(this.#setStyle(e));break;
                case 'content':structure.push(this.#setContent(e));break;
                case 'nsuri':this.nsuri=element ;break;
                case 'ai': this.#addAiComment(element,e);break;
                case 'props': break;
                
                
                default:{
                    const tag = pascalOrCamelToKebab(prop)
                    const isOld = this.#old?.has(prop) ?? false

                    if (element instanceof Array){
                        children = children
                            .concat(
                                element
                                    .map((nest,i)=>{
                                        if (!(nest instanceof Doom)) {
                                            nest = new Doom(nest)
                                            this[tag][i] = nest
                                        }

                                        nest.index= i

                                        if (nest.isVirgin) return nest.build(tag)

                                        if (update && !nest.isDeleted) return nest.build()
                                        else if (nest.isDeleted) garbage.push(()=> {
                                            nest.removeFrom(e)
                                            this[tag].splice(i,1)
                                        })

                                        return nest
                                    })
                            )
                    }
                    else if (element instanceof Doom) {
                        if (element.isVirgin)
                            element = element.build(
                                (element.root ?? false) ? null : tag
                            )
                        else if (update && !element.isDeleted) element = element.build()
                        else if (element.isDeleted) garbage.push(()=> {
                            element.removeFrom(e)
                            delete this[tag]
                        })

                        children.push(element)
                    } else {
                        const newOne = new Doom(element)
                        this[tag] = newOne

                        children.push(newOne.build(tag))
                    }
                }
            }
        })

        return {children,structure,garbage}
    }

    delete(){
        this.#rendered = false
        this.#toRemove = true
    }

    async build(name='div'|null, update =false){
        if (this.#toRemove) return this

        if (name==='svg')console.log('build svg')

        const e = name 
            ? !!this.nsuri 
                ?document.createElementNS(this.nsuri,name)
                :document.createElement(name) 
            : this.#self

        const {children, structure, garbage} = this.#inner(e, update)

        await Promise.all(structure)

        const childList = await Promise.all(children)

        childList
            .filter(child=>!child.isRendered)
            .forEach(child=>child.renderOn(e))

        garbage
            .forEach(dispose=>dispose())
        
        this.#self = e;
        
        const oldBoy = cloneByEntry(this)
        this.#old = new Map(Object.entries(oldBoy))

        return this;
    }

    removeFrom(parent=document.createElement()){
        if (parent.contains(this.#self)) parent.removeChild(this.#self)
    }

    renderOn(parent=document.createElement()){
        parent.appendChild(this.#self)
        this.#rendered = true
    }
}