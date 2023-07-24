import { cthulhu } from "./cthulhu";
import { HtmlMeta } from "./html-meta";

export class HtmlComponent extends HtmlMeta{
    constructor(template={}){
        super();

        this.root = cthulhu(template);
    }

    emitter=(event='',param={})=>
        this.dispatchEvent(
            new CustomEvent(event,{detail:param,bubbles:true})
        )

    connectedCallback(){
        this.root.build(true).then(e=>this.element.appendChild(e))
    }

    disconnectedCallback(){
        this.root.dispose();
    }

    attributeChangedCallback(name,oldValue,newValue){
        if (oldValue!=newValue && !!this.attributes){
            this.attributes[name](this.root,newValue)
            .then(subjects=>subjects.map(sub=>sub.build()))
            .then(promises=>Promise.all(promises));
        }
    }
}