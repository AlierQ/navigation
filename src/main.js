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
            error:function(){
                let title = $(item).find('.site-title')[0]
                title.textContent = '╮(╯▽╰)╭  长按命名';
            }
        })
        // 动态加载favicon
        $(item).find('.logo img')[0].src = 'http://47.95.207.116:18002/api/v1/favicon?url=' + item.href;
    })
})

// a标签事件
$('.site > a').each((index,item)=>{
    item.addEventListener('click',function(e){
        e.preventDefault();
        window.location.href = item.href
    })

    item.addEventListener('mousedown',function(){
        setTimeout(()=>{
            $(item).find('.site-title')[0].textContent = prompt('输入名称：');
        },300)
    })
})

// 删除按钮事件
$('.delete').each((index,item)=>{
    item.addEventListener('click',function(e){
        console.log(e);
        $(item).parent().parent().parent().remove()
        e.preventDefault();
        // 阻止冒泡
        e.stopPropagation();
    })
})