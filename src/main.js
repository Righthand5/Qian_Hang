const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const x = localStorage.getItem('x')
console.log(x)
const xObject = JSON.parse(x)//把字符串变为对象
console.log('xObject')
const hashMap = xObject || [
    {logo:'A',logoType:'text',url:'https://www.acfun.cn'},
    {logo:'B',logoType:'image',url:'https://www.bilibili.com'},//第一次xObeject为空
]
const simplifyUrl =(url) =>{
    return url.replace('https://','')
        .replace('http://','')
        .replace('www.','')
        .replace(/\/.*/,'')
}
const render =()=>{
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node,index)=>{
        const $li = $(`<li>
           <div class = "site">
                <div class = "logo">${node.logo}</div>
                <div class = "link">${simplifyUrl(node.url)}</div>
                <div class = "close">
                <svg class="icon">
                    <use xlink:href="#icon-baseline-close-px"></use>
                </svg>
                </div>
            </div>
    </li>`).insertBefore($lastLi)
        $li.on('click',()=>{
            window.open(node.url)
        })
        $li.on('click','.close',(e)=>{
            console.log('这里')
            e.stopPropagation()//阻止冒泡
            console.log(hashMap);
            hashMap.splice(index,1)
            render()//然后重新渲染ui
        })
    });
}

render()

$('.addButton').on('click',()=>{
    let url = window.prompt('请问你要添加的网站是啥')
    if(url.indexOf('http')!==0){
        url =  'https://'+url
    }
    console.log(url)
    hashMap.push({
        logo:simplifyUrl(url)[0].toUpperCase(),
        url:url
    });
    render()
});

window.onbeforeunload=()=>{//用户关闭页面之前触发
    console.log('页面要关闭啦')
    const string = JSON.stringify(hashMap)//hashMap转为一个字符串
    localStorage.setItem('x',string)//在本地的存储一个key为x只为string的字符串
}
$(document).on('keypress',(e)=>{
    // const key = e.key
    const {key} = e
    for(let i=0;i<hashMap.length;i++)
    {
        if(hashMap[i].logo.toLowerCase()===key){
            window.open(hashMap[i].url)
        }
    }
})