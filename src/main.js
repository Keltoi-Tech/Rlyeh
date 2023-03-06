import { cthulhu, define, HtmlComponent, trait } from "../component";
import { AppHeader } from "./header";
import { AppPanel } from "./panel";
import css from './main.scss';
import img from './cthulhu.png';

define(AppPanel)
define(AppHeader)

const MainPanel=()=>({
    appPanel:{
        img:{
            attributes:{
                slot:"content",
                src:img
            }
        },
        div:{
            attributes:{slot:'content'},
            p:[
                {
                    content:`
                        Cthulhu é um novo paradigma, que futuramente pode ser implementado para outras linguagens e funcionalidades
                        e que pode permitir um maior controle e dinamismo em arquiteturas de integração, além de facilitar 
                        o raciocínio para construção de tags utilizando um modelo de templates com objetos no lugar de hypertexto
                    `
                },
                {
                    content:`
                        Também dispondo de algumas ferramentas de roteamento de urls e componentização web, esta library busca 
                        reunir um paradigma mais próximo ao de linguagens de alto-nível e um pouco menos declarativo e pouco mais imperativo
                    `
                }
            ],
            ul:{
                li:[
                    {
                        span:{content:'Uma nova forma de desenvolver front-ends.'}
                    },
                    {
                        span:{content:'Voltado para melhorar a fluídez de raciocínios e permitir melhores arquiteturas de integração em componentes web'}
                    },
                    {
                        span:{content:'Uma abordagem sólida para gradualmente substutuir o paradigma declarativo por um pouco mais imperativo'}
                    },
                    {
                        span:{content:'Possibilidade de aplicativos mais resilientes e com baixo acoplamento'}
                    },
                    {
                        span:{content:'Cthulhu!'}
                    }
                ]
            }
        }
    }
})
export class AppMain extends HtmlComponent{
    constructor(e={content:''}){
        super(
            cthulhu({
                style:{
                    content:css
                },
                appHeader:{
                    attributes:{
                        text:e.content
                    },
                },
                mainPainel:trait(MainPanel),
            })
        );
    }
}