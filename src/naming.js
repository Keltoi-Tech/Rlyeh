import { pascalOrCamelToKebab } from "@keltoi/naming-converting"
import { Doom } from "./doom"

export const naming=(type=Doom)=>pascalOrCamelToKebab(type.name)