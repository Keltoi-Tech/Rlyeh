import { Doom } from "./doom";

export const changing = (hook=()=>new Doom())=> hook().build(null, true);