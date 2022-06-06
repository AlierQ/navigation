// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"epB2":[function(require,module,exports) {
// 点击开始时间
var start = 0;
// 点击结束时间
var end = 0;
// 站点信息
var hashMap = [{
    "logo": "https://api.xinac.net/icon/?url=https://alierq.space/",
    "title": "我的个人博客",
    "url": "https://alierq.space/"
}, {
    "logo": "https://api.xinac.net/icon/?url=https://github.com/AlierQ",
    "title": "我的GitHub主页",
    "url": "https://github.com/AlierQ"
}, {
    "logo": "https://api.xinac.net/icon/?url=https://github.com/AlierQ/navigation",
    "title": "Github导航项目地址",
    "url": "https://github.com/AlierQ/navigation"
}];
// 搜索前缀
var searchUrl = 'https://www.baidu.com/s?wd=';
// 搜索引擎列表
var searchList = {
    'baidu': 'https://www.baidu.com/s?wd=',
    'zhihu': 'https://www.zhihu.com/search?type=content&q=',
    'sougou': 'https://www.sogou.com/web?query=',
    // 'google':'https://www.baidu.com/s?wd=',
    'bing': 'https://cn.bing.com/search?q='
};

// 网页刚加载时
$(function () {
    // 当localstorage中有数据才读取
    if (JSON.parse(window.localStorage.getItem('sites')) !== null) {
        hashMap = JSON.parse(window.localStorage.getItem('sites'));
    }
    // 遍历站点信息
    hashMap.forEach(function (item) {
        // console.log(item);
        var $newLi = $("\n        <li>\n            <div class=\"site\">\n                <a href=\"" + item.url + "\">\n                    <div class=\"logo\">\n                        <img src=\"#\" alt=\"\">\n                    </div>\n                    <div class=\"detail\">\n                        <div class=\"site-title\">" + item.title + "</div>\n                        <div class=\"url\">" + item.url + "</div>\n                    </div>\n                    <div class=\"delete\">\u5220\u9664</div>\n                </a>\n            </div>\n        </li>\n        ");
        // a标签
        var $a = $newLi.find('.site > a');
        // 添加站点元素
        // $('.website>ul').prepend($newLi);  // 添加在最前面
        $('.website>ul').append($newLi); // 添加在最后面
        getTitleFavicon($a[0]);
    });
});

// 搜索按钮点击事件
$('.search > button').on('click', function (e) {
    window.location.href = searchUrl + $('.search > input').val();
});

// 选择搜索引擎
$('.engine > a').on('click', function (e) {
    searchUrl = searchList[e.target.name];
    // 取消所有样式
    $('.engine > a').each(function (index, item) {
        $(item).removeClass('checked');
    });
    $(this).addClass('checked');
});

// 通过事件委托向子元素添加点击删除和点击跳转功能
$('.website>ul').on('click', function (e) {
    // 先阻止ul的点击事件的行为
    e.preventDefault();
    // 点击的是删除按钮
    if ($(e.target).attr('class') === 'delete') {
        $(e.target).parent().parent().parent().remove();
        var href = $(e.target).parent()[0].href;
        hashMap.forEach(function (item, index) {
            if (item.url === href) {
                hashMap.splice(index, 1);
            }
        });
        // 将站点信息转换成json放入localstorage
        window.localStorage.setItem('sites', JSON.stringify(hashMap));
    } else if (e.target === this) {} else {
        // 除了删除按钮之外的都视为点击
        // console.log(e.target);
        end = new Date();
        // 鼠标按下和抬起小于300视为点击
        if (end - start <= 300) {
            var clickTag = $(e.target);
            // 向上找a标签获取地址
            while (clickTag[0].localName !== 'a') {
                clickTag = clickTag.parent();
            }
            window.location.href = clickTag[0].href;
        }
    }
});

$('.website>ul').on('mousedown', function (e) {
    start = new Date();
});

$('.website>ul').on('mouseup', function (e) {
    // 先阻止ul的点击事件的行为
    e.preventDefault();
    end = new Date();

    // 点击的不是删除按钮
    if ($(e.target).attr('class') !== 'delete') {
        // 鼠标按下和抬起时间差300m即为长按
        if (end - start >= 300) {
            if ($(e.target).parent().find('.site-title')[0] !== undefined) {
                $(e.target).parent().find('.site-title')[0].textContent = prompt('名称:');
                hashMap.forEach(function (item) {
                    if (item.url === $(e.target).parent().find('.url')[0].textContent) {
                        item.title = $(e.target).parent().find('.site-title')[0].textContent;
                    }
                });
                // 将站点信息转换成json放入localstorage
                window.localStorage.setItem('sites', JSON.stringify(hashMap));
            }
        }
    }
});

// 新增站点点击事件
$('.add').on('click', function () {
    var url = prompt('请输入网址：');
    var checkStr = /^https:\/\//g;
    if (url === null || url === undefined || url === '') {
        return;
    } else {
        if (!checkStr.test(url)) {
            url = 'https://' + url;
        }
        var $newLi = $("\n        <li>\n            <div class=\"site\">\n                <a href=\"" + url + "\">\n                    <div class=\"logo\">\n                        <img src=\"#\" alt=\"\">\n                    </div>\n                    <div class=\"detail\">\n                        <div class=\"site-title\">\u256E(\u256F\u25BD\u2570)\u256D  \u957F\u6309\u547D\u540D</div>\n                        <div class=\"url\">" + url + "</div>\n                    </div>\n                    <div class=\"delete\">\u5220\u9664</div>\n                </a>\n            </div>\n        </li>\n        ");
        // a标签
        var $a = $newLi.find('.site > a');
        // 添加站点元素
        // $('.website>ul').prepend($newLi);  // 添加在最前面
        $('.website>ul').append($newLi); // 添加在最后面
        // 动态加载网站名称和图标
        getTitleFavicon($a[0]);
        // 放入到站点集合中
        hashMap.push({
            logo: 'https://api.xinac.net/icon/?url=' + url,
            title: $newLi.find('.site-title')[0].textContent,
            url: url
        });
        // 将站点信息转换成json放入localstorage
        window.localStorage.setItem('sites', JSON.stringify(hashMap));
    }
});

// 移动端事件
// $('.website>ul').on('longTap',function(e){
//     alert('长按了')
// })

// $('.website>ul>li').on('touchend',function(e){
//     console.log(e);
// })

// 调用api自动获取网页图标
function getTitleFavicon(item) {
    // 动态加载favicon
    $(item).find('.logo img')[0].src = 'https://api.xinac.net/icon/?url=' + item.href;
}

// 关闭页面存储hashMap
// window.onbeforeunload = ()=>{
//     window.localStorage.setItem('sites',JSON.stringify(hashMap));
// }


// 键盘事件 回车直接搜索
$(document).on('keypress', function (e) {
    if (e.key === 'Enter') {
        $('.search > button').click();
    }
});
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.cb9b6653.map