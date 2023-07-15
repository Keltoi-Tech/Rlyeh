export const kek=(t='')=>t.replace(/[A-Z]/g,(m,i)=>i==0?m.toLowerCase():`-${m.toLowerCase()}`);

export const importStyle=async (url='index')=>await
fetch(url+'.css',{
    method:'GET',
    headers:{
        'Content-Type':'text/css'
    }
})
.then(response=>response.text());

export const buildCss=(css='')=>
{
    const sheet = new CSSStyleSheet
    sheet.replaceSync(css);
    return sheet;
}

export const settingValue=async(context,val)=>{
    context.value = val;

    return [context];
}

export const settingContent=async(context,val)=>{
    context.content = val;

    return [context];
}

export const setting=async(context={},val)=>({
    context,
    val    
});