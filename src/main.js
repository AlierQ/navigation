// 点击开始时间
let start = 0;
// 点击结束时间
let end = 0;
// 站点信息
let hashMap = [{"logo":"//47.95.207.116:18002/api/v1/favicon?url=https://alierq.space/","title":"我的个人博客","url":"https://alierq.space/"},{"logo":"http://47.95.207.116:18002/api/v1/favicon?url=https://github.com/AlierQ","title":"我的GitHub主页","url":"https://github.com/AlierQ"},{"logo":"http://47.95.207.116:18002/api/v1/favicon?url=https://github.com/AlierQ/navigation","title":"Github导航项目地址","url":"https://github.com/AlierQ/navigation"}];
// 搜索前缀
let searchUrl = 'https://www.baidu.com/s?wd=';
// 搜索引擎列表
let searchList = {
    'baidu':'https://www.baidu.com/s?wd=',
    'zhihu':'https://www.zhihu.com/search?type=content&q=',
    'sougou':'https://www.sogou.com/web?query=',
    'google':'https://www.baidu.com/s?wd=',
    'bing':'https://cn.bing.com/search?q='
};

// 网页刚加载时
$(function(){
    // 当localstorage中有数据才读取
    if(JSON.parse(window.localStorage.getItem('sites'))!==null){
        hashMap = JSON.parse(window.localStorage.getItem('sites'))
    }
    // 遍历站点信息
    hashMap.forEach((item)=>{
        // console.log(item);
        let $newLi = $(`
        <li>
            <div class="site">
                <a href="${item.url}">
                    <div class="logo">
                        <img src="#" alt="">
                    </div>
                    <div class="detail">
                        <div class="site-title">${item.title}</div>
                        <div class="url">${item.url}</div>
                    </div>
                    <div class="delete">删除</div>
                </a>
            </div>
        </li>
        `)
        // a标签
        let $a = $newLi.find('.site > a');
        // 添加站点元素
        // $('.website>ul').prepend($newLi);  // 添加在最前面
        $('.website>ul').append($newLi);  // 添加在最后面
        getTitleFavicon($a[0]);
    })
})

// 搜索按钮点击事件
$('.search > button').on('click',function(e){
    window.location.href = searchUrl +  $('.search > input').val()
})

// 选择搜索引擎
$('.engine > a').on('click',function(e){
    searchUrl =  searchList[e.target.name];
    // 取消所有样式
    $('.engine > a').each((index,item)=>{
        $(item).removeClass('checked')
    })
    $(this).addClass('checked')
})

// 通过事件委托向子元素添加点击删除和点击跳转功能
$('.website>ul').on('click',function(e){
    // 先阻止ul的点击事件的行为
    e.preventDefault();
    // 点击的是删除按钮
    if($(e.target).attr('class')==='delete'){
        $(e.target).parent().parent().parent().remove();
        let href = $(e.target).parent()[0].href;
        hashMap.forEach((item,index)=>{
            if(item.url === href){
                hashMap.splice(index,1)
            }
        })
        // 将站点信息转换成json放入localstorage
        window.localStorage.setItem('sites',JSON.stringify(hashMap));

    }else if(e.target === this){

    }
    else{ // 除了删除按钮之外的都视为点击
        // console.log(e.target);
        end = new Date();
        // 鼠标按下和抬起小于300视为点击
        if(end - start <=300){
            let clickTag = $(e.target);
            // 向上找a标签获取地址
            while(clickTag[0].localName!=='a'){
                clickTag = clickTag.parent();
            }
            window.location.href = clickTag[0].href
        }
    }
})

$('.website>ul').on('mousedown',function(e){
    start = new Date();
})

$('.website>ul').on('mouseup',function(e){
    // 先阻止ul的点击事件的行为
    e.preventDefault();
    end = new Date();

    // 点击的不是删除按钮
    if($(e.target).attr('class')!=='delete'){
        // 鼠标按下和抬起时间差300m即为长按
        if(end - start >= 300){
            if($(e.target).parent().find('.site-title')[0]!==undefined){
                $(e.target).parent().find('.site-title')[0].textContent = prompt('名称:');
                hashMap.forEach((item)=>{
                    if(item.url === $(e.target).parent().find('.url')[0].textContent){
                        item.title = $(e.target).parent().find('.site-title')[0].textContent;
                    }
                })
                // 将站点信息转换成json放入localstorage
                window.localStorage.setItem('sites',JSON.stringify(hashMap));
            }
        }
    }
})

// 新增站点点击事件
$('.add').on('click',()=>{
    let url = prompt('请输入网址：');
    let checkStr =/^https:\/\//g;
    if(url===null||url===undefined||url===''){
        return;
    }else{
        if(!checkStr.test(url)){
            url = 'https://' + url;
        }
        let $newLi = $(`
        <li>
            <div class="site">
                <a href="${url}">
                    <div class="logo">
                        <img src="#" alt="">
                    </div>
                    <div class="detail">
                        <div class="site-title">╮(╯▽╰)╭  长按命名</div>
                        <div class="url">${url}</div>
                    </div>
                    <div class="delete">删除</div>
                </a>
            </div>
        </li>
        `)
        // a标签
        let $a = $newLi.find('.site > a');
        // 添加站点元素
        // $('.website>ul').prepend($newLi);  // 添加在最前面
        $('.website>ul').append($newLi);  // 添加在最后面
        // 动态加载网站名称和图标
        getTitleFavicon($a[0]);
        // 放入到站点集合中
        hashMap.push({
            logo:'//47.95.207.116:18002/api/v1/favicon?url=' + url,
            title:$newLi.find('.site-title')[0].textContent,
            url:url
        })
        // 将站点信息转换成json放入localstorage
        window.localStorage.setItem('sites',JSON.stringify(hashMap));
        
    }
})

// 移动端事件
// $('.website>ul').on('longTap',function(e){
//     alert('长按了')
// })

// $('.website>ul>li').on('touchend',function(e){
//     console.log(e);
// })

// 调用api自动获取网页图标
function getTitleFavicon(item){
    // 动态加载favicon
    $(item).find('.logo img')[0].src = '//47.95.207.116:18002/api/v1/favicon?url=' + item.href;
}

// 关闭页面存储hashMap
// window.onbeforeunload = ()=>{
//     window.localStorage.setItem('sites',JSON.stringify(hashMap));
// }


// 键盘事件 回车直接搜索
$(document).on('keypress',(e)=>{
    if(e.key === 'Enter'){
        $('.search > button').click()
    }
})