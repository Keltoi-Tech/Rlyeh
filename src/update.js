import { Doom } from "./doom"

export const update=(element=new Doom(),change=()=>{})=>{
    change(element)

    if (element instanceof Doom) element.build()
}