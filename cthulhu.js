import { HtmlMeta } from "./html-meta";
import { kek } from "./utils";

const fthagn=(e,prop)=>
    e instanceof Cthulhu || e instanceof HTMLElement
        ?e
        :new Cthulhu(e,prop);

export class Cthulhu{
    #element = new DocumentFragment();
    #content = undefined|'';
    #attributes=undefined|new Map();
    #events = undefined|new Map();
    #eventsToRemove=new Map();
    #state={
        content:false,
        attributes:new Map(),
        events:new Map()
    };

    get element(){
        return this.#element;
    }

    get content(){
        return this.#content;
    }

    set content(value=''){
        this.#content = value;
        this.#state.content = true;
    }

    get attributes(){
        return Object.fromEntries(this.#attributes);
    }

    set attributes(value={}){
        const attr = Object.entries(value);
        for (const [prop,val] of attr)
            this.setAttribute(prop,val);
    }

    get events(){
        return Object.fromEntries(this.#events);
    }

    set events(value={}){
        const ev = Object.entries(value);
        for (const [prop,val] of ev)
            this.addEvent(prop,val);
    }    

    async removeAttribute(name=''){
        this.#attributes.delete(name);
        this.#state.attributes.set(name,true);
    }

    setAttribute(name='',value){
        if (this.#attributes===0) this.#attributes = new Map();
        this.#attributes.set(name,value);
        this.#state.attributes.set(name,true);
    }

    async addEvent(name='',event=()=>{}){
        this.#events.set(name,event);
        this.#state.events.set(name,true);
    }

    async removeEvent(name=''){
        this.#eventsToRemove.set(name,this.#events.get(name))
        this.#events.delete(name);
        this.#state.events.set(name,true);
    }

    dispose(){
        for (const [event,callback] of this.#events)
            this.#element.removeEventListener(event,callback);

        const me = new Map(Object.entries(this));

        for (const [prop,instance] of me){
            if (instance instanceof Cthulhu) instance.dispose();
            else if (instance instanceof Array)
                instance.forEach(i=>{
                    if (i instanceof Cthulhu)i.dispose();
                });
        }
    }

    async remove(child='',index=0){
        if (this[child] instanceof Array){
            const subject = this[child][index];
            if (subject instanceof Cthulhu){
                subject.dispose();
                this.#element.removeChild(this[child][index].element);
            }
            
            this[child].splice(index,1);
        } else {
            if (this[child] instanceof Cthulhu){
                this[child].dispose();
                this.#element.removeChild(this[child].element);
            }
            
            delete this[child];
        } 
    }

    constructor(o = {},name = ''){
        const map = new Map(Object.entries(o));

        if (name!=='') this.#element = document.createElement(kek(name));

        if (map.has('content')){
            this.#content= map.get('content');
            this.#state.content= true;
            map.delete('content');
        }

        if (map.has('events')){
            this.#events = new Map(Object.entries(o.events));
            for (const ev of this.#events.keys()){
                this.#state.events.set(ev,true);
            }
            map.delete('events');
        }        

        if (map.has('attributes')){
            this.#attributes = new Map(Object.entries(o.attributes));
            for(const attr of this.#attributes.keys()){
                this.#state.attributes.set(attr,true);
            }
            map.delete('attributes');
        }

        for(const [prop,e] of map)
            Array.isArray(map.get(prop))
                ?this[prop] = e.map(sub=>fthagn(sub,prop))
                :this[prop] = fthagn(e,prop)
    }

    conciliateAttributes(key=''){
        if (this.#attributes.has(key)) {
            this.#element.setAttribute(kek(key),this.#attributes.get(key));
            this.#state.attributes.set(key,false);
        } else {
            this.#element.removeAttribute(key); 
            this.#state.attributes.delete(key);
        }
    }

    conciliateEvents(key=''){
        if (this.#events.has(key)){
            this.#element.addEventListener(key,this.#events.get(key));
            this.#state.events.set(key,false);
        } else {
            this.#element.removeEventListener(key,this.#eventsToRemove.get(key));
            this.#eventsToRemove.delete(key);
            this.#state.events.delete(key);
        }
    }

    async createChild(instance,compose=false){
        const element = (instance instanceof Cthulhu)
                            ?await instance.build(compose)
                            :instance;
        if (compose)this.#element.appendChild(element);
    }

    async build(compose=false)
    {
        if (this.#state.content){
            this.#element.textContent = this.#content;
            this.#state.content = false;
        }

        for (const [key,value] of this.#state.attributes)
            if (value)this.conciliateAttributes(key);

        for (const [key,value] of this.#state.events)
            if (value)this.conciliateEvents(key);

        const me = new Map(Object.entries(this));

        for (const [prop,instance] of me){
            if (instance instanceof Array){
                instance.forEach(async (i,index)=>{
                    if (i instanceof Cthulhu || i instanceof HtmlMeta) {
                        await this.createChild(i,compose);
                    } else {
                        this[prop][index] =new Cthulhu(i,prop);
                        await this.createChild(this[prop][index],true);
                    }
                });
            } else if(instance instanceof Cthulhu || instance instanceof HtmlMeta){
                await this.createChild(instance,compose);
            } else {
                this[prop]=new Cthulhu(instance,prop);
                await this.createChild(this[prop],true);
            }
        }
        
        return this.#element;
    }
}