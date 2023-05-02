import { Cthulhu } from "./cthulhu.js";
import { kek } from "./utils.js";
import { HtmlMeta } from "./html-meta.js";

const newCss=(css='')=>
{
    const sheet = new CSSStyleSheet
    sheet.replaceSync(css);
    return sheet;
}

export const cthulhu=(template={},name='')=>name==''?new Cthulhu(template):new Cthulhu(template,name);

export class HtmlComponent extends HtmlMeta{
    constructor(template={}){
        super();

        if (!!template.attributes)
            delete template.attributes;

        if (!!template.inlineSheet){
            const sheet = newCss(template.inlineSheet);
            this.element.adoptedStyleSheets=[sheet];
            delete template.inlineSheet;
        }

        if (!!template.css){
            template.css.then(css=>{
                const sheet = newCss(css);
                this.element.adoptedStyleSheets=[sheet];
                delete template.css;
            })
        }
        
        this.root = new Cthulhu(template);
    }

    connectedCallback(){
        this.root.build(true).then(e=>this.element.appendChild(e))
    }

    disconnectedCallback(){
        this.root.dispose();
    }

    attributeChangedCallback(name,oldValue,newValue){
        if (oldValue!=newValue && !!this.attributes){
            this.attributes[name](this.root,newValue);
        }
            
    }

}

export const define=(type,services={})=>{
    const name = kek(type.name);
    if (type.__proto__.name=='HtmlComponent'){
        if (customElements.get(name)===undefined)customElements.define(name,type);
    }
    else 
    {
        if (customElements.get(name)===undefined){
            const tpl = type(services);
            const attr = tpl.attributes;
            customElements.define(name,
                class extends HtmlComponent{
                    constructor(){
                        super(tpl);
                    }

                    static get observedAttributes(){
                        return !!attr?Object.keys(attr):[];
                    }
                    
                    attributes = !!attr?attr:undefined;
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