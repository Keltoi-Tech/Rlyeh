import { Routing } from "./routing";

export const head=(instance=async()=>{})=>instance().then(e=>document.head.appendChild(e));

export const compose=(instance=async()=>{})=>instance().then(e=>document.body.appendChild(e));

export const view=(route={index:()=>{},params:[],sub:{}})=>{
    document.body.innerHTML='';
    document.body.appendChild(route.index(route.params,route.sub));
};

export const entry=(routing=new Routing())=>{
    window.onpopstate=()=>{
        let route = routing.to(window.location.pathname);
        view(route);
    };

    let route = routing.to(window.location.pathname);
    view(route);
}