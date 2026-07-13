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
    #doom
    #render
    #template={}
    params={}
    
    constructor({
        doom = async () => new Doom(), 
        css= [Promise.resolve(new CSSStyleSheet)]
    }){
        super()

        this.#dom = this.attachShadow({mode:'open'})

        this.#template = {
            doom:doom,
            css:css
        }

        const render = () => doom(this.params)
            .then(d=>{
                d.renderOn(this.#dom)
                
                this.#doom = d
            })

        this.#render = 
            (!!css)
                ?()=>Promise
                    .all(css)
                    .then(sheets=>
                        this
                            .#dom
                            .adoptedStyleSheets = sheets
                    )
                    .then(render)
                :render
    }



    get doom(){ return this.#doom }

    connectedCallback(){
        this.#render()
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) return

        this.params[name] = newValue

        if (this.doom) this.doom.props[name]()
    }
}

export class TextElement extends BaseElement{
    constructor(template = ''){
        super() 

        const shadow = this.attachShadow({mode:'open'})

        shadow.innerHTML = template
        
    }
}