import { Doom } from "./doom"

export const update=(element=new Doom(),change=()=>{})=>{
    change(element)

    element.build(null, true)
}