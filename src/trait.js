import { cthulhu } from "./cthulhu";
import { kek } from "./utils";

export const trait = (func,param = null) =>{
    const name = kek(func.name);
    return cthulhu(!!param?func(param):func(),name);
}