import { changing } from "./changing";
import { Doom } from "./doom";

class NodeWrapper {
    #self
    constructor(node = new Doom()){
        this.#self = node
    }

    clean(child=(n=new Doom())=>new Doom()){
        child(this.#self).delete()

        return this
    }

    cleanMany(children=(n=new Doom())=>[new Doom()]){
        children(this.#self).forEach(child=>child.delete())

        return this
    }

    update(change=(n=new Doom())=>{}){
        change(this.#self)

        return this
    }

    conciliate=()=>changing(()=>this.#self).then(()=>this)
}

export const use = (node = new Doom())=> new NodeWrapper(node)