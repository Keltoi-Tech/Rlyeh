export const kek=(t='')=>t.replace(/[A-Z]/g,(m,i)=>i==0?m.toLowerCase():`-${m.toLowerCase()}`);

export const importStyle=async (url='index')=>await
fetch(url+'.css',{
    method:'GET',
    headers:{
        'Content-Type':'text/css'
    }
})
.then(response=>response.text());