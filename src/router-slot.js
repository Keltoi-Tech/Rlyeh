import { Doom } from "./doom";
import { use } from "./use";

export const routerSlot = (node = new Doom(), child = new Doom()) => 
    use(node.routerSlot)
        .clean(e=>e.main)
        .conciliate()
        .then(u=>u
            .update(e=>e.main = { child })
            .conciliate()
        );