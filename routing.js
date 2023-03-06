export class Routing {
    constructor(routes){
        this.routes = routes;
    }

    to=(path='/')=> {
        const tokenPath=path.split('/');
        let route={};
        let paramIndex = 0;
        let params=[];
        let skip = false;

        tokenPath.every((p,i)=>{
            if (p===''){
                route = this.routes;
                params =('params' in route)?Object.keys(route.params):[];
                skip = ('master' in route)?route.master:false;                
            }
            else 
            {
                if (!!route){
                    if (p in route){
                        if (skip){
                             route.sub={
                                routing:route[p],
                                url:'/'+tokenPath.slice(i+1,tokenPath.length).join('/')
                            }
                            return false;
                        }
                        route = route[p];
                        params =('params' in route)?Object.keys(route.params):[];
                        skip = ('master' in route)?route.master:false;
                    } else if (params.length>0){
                        route.params[params[paramIndex]]=p;
                        paramIndex++;
                    } else route=undefined;
                }
            }

            return true;
        })

        if ('index' in route){
            history.pushState({state:'new'},'',path);
            
            return {
                index:route.index,
                params:route.params,
                sub:!!route.sub?route.sub:null
            }
        } else return route.notFound;
    }
}