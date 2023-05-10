export class HtmlMeta extends HTMLElement{
    constructor(){
        super();
        this.element = this.attachShadow({mode:'closed'});
    }
}