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

    attributeChangedCallback(name,oldValue,newValue){
        if (oldValue!=newValue && !!this.attributes)
            this.attributes[name](this.root,newValue);
    }

}

export const define=(type,emitter=undefined)=>{
    const name = kek(type.name);
    if (type.__proto__.name=='HtmlComponent'){
        if (customElements.get(name)===undefined)customElements.define(name,type);
    }
    else 
    {
        if (customElements.get(name)===undefined){
            let o = type(emitter);
            let att;

            if (!!o.attributes){
                att = o.attributes;
                delete o.attributes
            }

            customElements.define(name,
                class extends HtmlComponent{
                    constructor(){
                        super();
                        this.template = o;
                        this.generate();
                    }

                    static get observedAttributes(){
                        return !!att?Object.keys(att):[];
                    }

                    attributes = !!att?att:undefined;
                }
            );
        }
    }
}


export const component = (func, param = null)=>{
    const name = kek(func.name);
    let elementInstance = customElements.get(name);
    return (elementInstance===undefined)
        ?null
        :new elementInstance(param);
}

export const trait = (func,param = null) =>{
    const name = kek(func.name);
    return new Cthulhu(!!param?func(param):func(),name);
}