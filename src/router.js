import { Doom } from "./doom"

export class Router{
    #route

    static App({app=()=>{}}){
        const router = new Router({
            '/':(s)=>app(s)
        })

        const loader = ()=>{
            const match = router?.matchUrl()

            document.body.innerHTML = ''
          
            if (match) match
                .then(view=>view.renderOn(document.body))
        }

        document.addEventListener('DOMContentLoaded',loader)
        window.addEventListener('popstate',(event)=>{
            if (event.state) loader()
        })
    }

    constructor(route={}){
        this.#route = route
    }

    get isHome(){ return window.location.pathname==='/' }

    matchUrl = () => this.match(window.location.pathname,window.location.search)

    notFound=()=>Doom.$(
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

            const params = routeTokens
                .reduce((p,a,i)=>{
                    if (match.paramSearch.test(a)) {
                        const param = decodeURI(linkTokens[i])
                        const numParam = Number.parseFloat(param)

                        p[a.replace(':','')] = Number.isNaN(numParam) ? param : numParam
                    }

                    return p
                },{})

            const query = (search==='')
                ?{}
                :search
                    .replace('?','')
                    .split('&')
                    .reduce((p,a)=>{
                        const [key,value] = a.split('=')

                        p[key]=value

                        return p
                    },{})

            history.pushState({},'',destination)   

            return match.value({query,params})
        }

        return this.notFound()
    }

    static go(url='',router = new Router()){
        const [link,search] = url.split('?')

        const match = router.matchUrl(link,search)

        return (match instanceof Router) ? Router.go(url,match) : match
    }
}