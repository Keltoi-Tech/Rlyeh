import { HtmlComponent } from "./html-component";
import { buildCss, kek } from "./utils";

export const define=(type)=>{
    const name = kek(type.name);
    if (type.__proto__.name=='HtmlComponent'){
        if (customElements.get(name)===undefined)customElements.define(name,type);
    }
    else if (customElements.get(name)===undefined)
    {
        let context={}
        const o = type(context);
        const attr = o.attributes;

        customElements.define(
            name,
            class extends HtmlComponent{
                constructor(services){
                    super(o.template);

                    if (!!o.css){
                        const sheet = buildCss(o.css);
                        this.element.adoptedStyleSheets=[sheet];
                    }

                    context.me = this;
                    context.services = services;
                }       

                static get observedAttributes(){
                    return !!attr?Object.keys(attr):[];
                }

                attributes = !!attr?attr:undefined;
            }
        );
    }
    
}
