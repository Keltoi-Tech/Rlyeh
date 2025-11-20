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
    #template
    constructor(template = new Doom()){
        super()

        this.#template = template

        const shadow = this.attachShadow({mode:'open'})

        template.renderOn(shadow)
    }

    get template(){
        return this.#template
    }
}

export class TextElement extends BaseElement{
    constructor(template = ''){
        super() 

        const shadow = this.attachShadow({mode:'open'})

        shadow.innerHTML = template
        
    }
}