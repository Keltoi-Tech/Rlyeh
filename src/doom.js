import { Cthulhu } from "cthulhu";
import { pascalOrCamelToKebab } from '@keltoi/naming-converting';

export class Doom extends Cthulhu{
    #self;
    #old;
    #toRemove=false;
    #root=false;

    get root(){return this.#root}
    set root(value=false){this.#root = value}

    get isVirgin(){
        return !this.#old
    }

    get isDeleted(){
        return this.#toRemove
    }

    constructor(me){
        super(Doom,me,"content","attributes","events","styleProps","hooks","nsuri","ai")
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

    #setAttributes = async (node=document.createElement())=>{
        const attributeMap = new Map(Object.entries(this.attributes))

        if (this.#old?.has('attributes')){
            await Doom.compare({
                oldMap:this.#old,
                newMap:attributeMap,
                set:(key,val)=>node.setAttribute(pascalOrCamelToKebab(key),val),
                remove:(key)=>{
                    if (key!='style') node.removeAttribute(pascalOrCamelToKebab(key))
                }
            })
        }
        else attributeMap.forEach((val,attr)=>node.setAttribute(pascalOrCamelToKebab(attr),val))
    }

    #setEvents= async(node=document.createElement())=>{
        const eventMap = new Map(Object.entries(this.events))

        if (this.#old?.has('events')){
            await Doom.compare({
                oldMap:this.#old,
                newMap:eventMap,
                set:(key,val)=>val.forEach(e=>node.addEventListener(key,e)),
                remove:(key,val)=>{
                    try{
                        node.removeEventListener(key,val)
                    } finally {
                        return
                    }
                }
            })
        }
        else eventMap.forEach((val,eve)=>val.forEach(e=>node.addEventListener(eve,e)))
    }

    #setStyle= async (node=document.createElement())=>{
        const styleMap = new Map(Object.entries(this.styleProps))

        if (this.#old?.has('styleProps')){
            const oldStyleMap = new Map(Object.entries(this.#old.get('styleProps')))

            await Doom.compare({
                oldMap:oldStyleMap,
                newMap:styleMap,
                set:(key,val)=>node.style[key]=val,
                remove:(key)=>node.style[key]=''
            })
        }
        else styleMap.forEach((val,sty)=>node.style[sty]=val)
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

        self.forEach((element,prop)=>{
            switch(prop){
                case 'attributes':structure.push(this.#setAttributes(e));break;
                case 'events':structure.push(this.#setEvents(e));break;
                case 'styleProps':structure.push(this.#setStyle(e));break;
                case 'content':structure.push(this.#setContent(e));break;
                case 'nsuri':this.nsuri=element ;break;
                case 'hooks': break;
                case 'ai': break;
                
                default:{
                    const tag = pascalOrCamelToKebab(prop)
                    const isOld = this.#old?.has(prop) ?? false

                    if (element instanceof Array){
                        if (isOld){
                            const previous = this.#old.get(prop)

                            this.#dealWithList(e,element,previous)
                        }

                        children = children.concat(
                            element
                            .map((nest,i)=>{
                                nest.index= i
                                return nest.isVirgin 
                                    ? nest.build(tag) 
                                    : update 
                                        ? nest.build() 
                                        : nest
                            })
                        )
                    }
                    else if (element instanceof Doom) {
                        if (element.isVirgin)
                            element = element.build(
                                (element.root ?? false) ? null : tag
                            )
                        else if (update) element = element.build()

                        children.push(element)
                    }
                }
            }
        })

        return {children,structure,self}
    }

    delete(){
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

        const {self,structure,children} = this.#inner(e, update)

        await Promise.all(structure)

        await Promise.all(children)
                .then(childList=>{
                    childList.forEach(
                        child=>{ 
                            if (!child.isVirgin){
                                child.renderOn(e)
                                if (child.isDeleted) child.removeFrom(e)
                            }
                        }
                    )
                })
        
        this.#self = e;
        this.#old = self;

        return this;
    }

    removeFrom(parent=document.createElement()){
        parent.removeChild(this.#self)
    }

    renderOn(parent=document.createElement()){
        parent.appendChild(this.#self)
    }
}