// let siteList = $('.site');
// let url = $(siteList[0]).find('a').attr('href')
// console.log(url);
// console.log($("#div").load( "http://www.bilibili.com" + " a[id^='page']"))

$(function(){
    let urls= $('.site > a');
    urls.each((index,item)=>{
        // 动态获取title
        $.ajax({
            url:'https://textance.herokuapp.com/rest/title/' + item.href,
            success:function(data,status,xhr){
                let title = $(item).find('.site-title')[0]
                if(title.textContent === '')
                    title.textContent = data;
            },
            error:function(){}
        })
        
        // 动态加载favicon
        $(item).find('.logo img')[0].src = 'http://47.95.207.116:18002/api/v1/favicon?url=' + item.href;
    })
})