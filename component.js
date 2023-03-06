import { Cthulhu } from "./cthulhu";
import { kek } from "./utils";
import { HtmlMeta } from "./html-meta";

export const cthulhu=(template={})=>new Cthulhu(template);

export class HtmlComponent extends HtmlMeta{
    constructor(root = new Cthulhu({})){
        super();
        this.root = root;
    }

    connectedCallback(){
        this.root.build(true).then(e=>this.element.appendChild(e))
    }

    disconnectedCallback(){
        this.root.dispose();
    }

    attributeChangedCallback(name,oldValue,newValue){
        if (oldValue!=newValue && !!this.attributes)
            this.attributes[name](this.root,newValue);
    }

}

export const define=(type,outer=undefined)=>{
    const name = kek(type.name);
    if (type.__proto__.name=='HtmlComponent'){
        if (customElements.get(name)===undefined)customElements.define(name,type);
    }
    else 
    {
        if (customElements.get(name)===undefined){
            let template = type(outer);
            let att;

            if (!!template.attributes){
                att = template.attributes;
                delete template.attributes
            }

            customElements.define(name,
                class extends HtmlComponent{
                    constructor(){
                        super(cthulhu(template));
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
    return cthulhu(!!param?func(param):func(),name);
}