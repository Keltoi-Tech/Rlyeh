import { component, define } from "../component";
import { Routing } from "../routing";
import { AppMain } from "./main";

define(AppMain)
export const route = new Routing(
    {
        index:(param=null,subRoute={})=>component(AppMain,{content:"Ph'nglui mglw'nafh Cthulhu R'lyeh wgah'nagl fhtagn"}),
        master:true
    }
);