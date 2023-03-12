import { Cthulhu } from "./cthulhu.js";
import { kek } from "./utils.js";
import { HtmlMeta } from "./html-meta.js";

export const cthulhu=(template={},name='')=>name==''?new Cthulhu(template):new Cthulhu(template,name);

export class HtmlComponent extends HtmlMeta{
    constructor(template={}){
        super();
        if (!!template.attributes)
            delete template.attributes;
        
        this.root = new Cthulhu(template);
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

export const define=(type)=>{
    const name = kek(type.name);
    if (type.__proto__.name=='HtmlComponent'){
        if (customElements.get(name)===undefined)customElements.define(name,type);
    }
    else 
    {
        if (customElements.get(name)===undefined){
            /*let template = type(outer);
            let att;

            if (!!template.attributes){
                att = template.attributes;
                delete template.attributes
            }*/
            const att = type()?.attributes;
            customElements.define(name,
                class extends HtmlComponent{
                    constructor(inject={}){
                        super(type(inject));
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