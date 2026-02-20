import { Doom } from "./doom"

export class BaseElement extends HTMLElement{
    constructor(){
        super()
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) return

        this[name] = newValue

    }
}

export class CthulhuElement extends BaseElement{
    #dom
    
    constructor({
        doom = async () => new Doom(), 
        css= [Promise.resolve(new CSSStyleSheet)]
    }){
        super()

        this.#dom = this.attachShadow({mode:'open'})

        const render = () => doom().then(d=>d.renderOn(this.#dom))

        if (!!css)
            Promise
                .all(css)
                .then(sheets=>
                    this
                        .#dom
                        .adoptedStyleSheets = sheets
                )
                .then(render)
        else
            render()
    }

}

export class TextElement extends BaseElement{
    constructor(template = ''){
        super() 

        const shadow = this.attachShadow({mode:'open'})

        shadow.innerHTML = template
        
    }
}