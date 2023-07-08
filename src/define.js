import { HtmlComponent } from "./html-component";
import { kek } from "./utils";

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
