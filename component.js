import { Cthulhu } from "./cthulhu";
import { kek } from "./utils";
import { HtmlMeta } from "./html-meta";

export class HtmlComponent extends HtmlMeta{
    constructor(){
        super();
    }

    generate(){
        this.root = new Cthulhu(this.template);
        this.root.build(true).then(e=>this.element.appendChild(e));        
    }

    disconnectedCallback(){
        this.root.dispose();
    }

    connectedCallback(){
        this.generate();
    }

    attributeChangedCallback(name,oldValue,newValue){
        if (oldValue!=newValue)this[name]=newValue;
    }
}

export const define=(type)=>{
    const name = kek(type.name);
    if (customElements.get(name)===undefined)customElements.define(name,type);
}

export const component = (func, param = null)=>{
    const name = kek(func.name);
    let elementInstance = customElements.get(name);
    if (elementInstance===undefined){
        customElements.define(name,
        class extends HtmlComponent{
            constructor(param = undefined){
                super();
                this.template = !!param?func(param):func();
            }
        });

        elementInstance = customElements.get(name);
    }

    return new elementInstance(param);
}

export const trait = (func,param = null) =>{
    const name = kek(func.name);
    return new Cthulhu(!!param?func(param):func(),name);
}