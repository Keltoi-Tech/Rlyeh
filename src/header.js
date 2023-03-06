import css from './header.scss';

export const AppHeader=()=>({
    style:{
        attributes:{
            type:"text/css"
        },
        content:css
    },
    header:{
        nav:{
            h1:{
                content:""
            }
        }
    },
    attributes:{
        text:(root,value)=>{
            root.header.nav.h1.content=value;
            root.header.nav.h1.build();
        }
    }
})
