import { Doom } from "./doom"

export class Router{
    #route
    #service

    static App(app=()=>{},service={}){
        const router = new Router({
            '/':(s)=>app(s)
        },service)

        const loader = ()=>{
            const match = router?.match(window.location.pathname,window.location.search)
            const div = document.querySelector('#app')
          
            div.innerHTML = ''
            
            if (match) match.then(view=>view.renderOn(div))
        }

        document.addEventListener('DOMContentLoaded',loader)
        window.onpopstate = loader
    }

    constructor(route={},service={},me=()=>{}){
        this.#route = route
        this.#service = service
    }

    notFound=()=>({
        build:()=>Doom.$(
            'not-found',
            {
                h1:{
                    content:'Page Not Found'
                },
                p:{
                    content:'404'
                }
            }
        )
    })

    #matching=(link='')=>{
        for (const [r,v] of Object.entries(this.#route)){
            const paramSearch = /\:[a-zA-Z]+/g
            const search  = r.replaceAll(paramSearch,'[A-Za-z0-9]+')
            const matcher = new RegExp(search)

            if (matcher.test(link)) return {
                paramSearch,
                matcher,
                route:r,
                value:v
            }
        }

        return null
    }

    match(link='',search=''){
        const destination = `${window.location.protocol}//${window.location.host}${link}`

        const match = this.#matching(link)

        if (match){
            const linkTokens = link.split('/')
            const routeTokens = match.route.split('/')

            const currentParams = routeTokens.reduce((p,a,i)=>{
                if (match.paramSearch.test(a)) {
                    const param = decodeURI(linkTokens[i])
                    const numParam = Number.parseFloat(param)

                    p[a.replace(':','')] = Number.isNaN(numParam) ? param : numParam
                }

                return p
            },{})

            if (search!=''){
                const query = search
                .replace('?','')
                .split('&')
                .reduce((p,a)=>{
                    const [key,value] = a.split('=')

                    p[key]=value

                    return p
                },{})

                this.#service = {...this.#service,...{query}}
            }

            const params = {...this.#service.params,...currentParams}

            const service = {...this.#service,...{params},link}

            history.pushState({},'',destination)   

            return match.value(service)
        }

        return this.notFound()
    }
}