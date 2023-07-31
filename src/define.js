import { cthulhu } from "./cthulhu";
import { HtmlComponent } from "./html-component";
import { buildCss, kek } from "./utils";

export const define=(type,services={})=>{
    const name = kek(type.name);
    if (type.__proto__.name=='HtmlComponent'){
        if (customElements.get(name)===undefined)customElements.define(name,type);
    }
    else if (customElements.get(name)===undefined)
    {
        const o = type(services);
        const attr = o.attributes;

        customElements.define(
            name,
            class extends HtmlComponent{
                constructor(){
                    super();

                    this.root = cthulhu(o.template(this))

                    if (!!o.css){
                        const sheet = buildCss(o.css);
                        this.element.adoptedStyleSheets=[sheet];
                    }

                }       

                static get observedAttributes(){
                    return !!attr?Object.keys(attr):[];
                }

                attributes = !!attr?attr:undefined;
            }
        );
    }
    
}
