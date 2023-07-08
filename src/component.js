import { kek } from "./utils.js";

export const component = (func, param = null)=>{
    const name = kek(func.name);
    let elementInstance = customElements.get(name);
    return (elementInstance===undefined)
        ?null
        :new elementInstance(param);
}
