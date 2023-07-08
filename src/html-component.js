import { cthulhu } from "./cthulhu";
import { HtmlMeta } from "./html-meta";

const newCss=(css='')=>
{
    const sheet = new CSSStyleSheet
    sheet.replaceSync(css);
    return sheet;
}

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
        
        this.root = cthulhu(template);
    }

    emmiter(event='',param={}){
        this.dispatchEvent(new CustomEvent(event,{
            detail:param
        }))
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