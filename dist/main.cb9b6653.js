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
// ??????????????????
var start = 0;
// ??????????????????
var end = 0;
// ????????????
var hashMap = [{
    "logo": "https://api.xinac.net/icon/?url=https://alierq.space/",
    "title": "??????????????????",
    "url": "https://alierq.space/"
}, {
    "logo": "https://api.xinac.net/icon/?url=https://github.com/AlierQ",
    "title": "??????GitHub??????",
    "url": "https://github.com/AlierQ"
}, {
    "logo": "https://api.xinac.net/icon/?url=https://github.com/AlierQ/navigation",
    "title": "Github??????????????????",
    "url": "https://github.com/AlierQ/navigation"
}];
// ????????????
var searchUrl = 'https://www.baidu.com/s?wd=';
// ??????????????????
var searchList = {
    'baidu': 'https://www.baidu.com/s?wd=',
    'zhihu': 'https://www.zhihu.com/search?type=content&q=',
    'sougou': 'https://www.sogou.com/web?query=',
    // 'google':'https://www.baidu.com/s?wd=',
    'bing': 'https://cn.bing.com/search?q='
};

// ??????????????????
$(function () {
    // ???localstorage?????????????????????
    if (JSON.parse(window.localStorage.getItem('sites')) !== null) {
        hashMap = JSON.parse(window.localStorage.getItem('sites'));
    }
    // ??????????????????
    hashMap.forEach(function (item) {
        // console.log(item);
        var $newLi = $("\n        <li>\n            <div class=\"site\">\n                <a href=\"" + item.url + "\">\n                    <div class=\"logo\">\n                        <img src=\"#\" alt=\"\">\n                    </div>\n                    <div class=\"detail\">\n                        <div class=\"site-title\">" + item.title + "</div>\n                        <div class=\"url\">" + item.url + "</div>\n                    </div>\n                    <div class=\"delete\">\u5220\u9664</div>\n                </a>\n            </div>\n        </li>\n        ");
        // a??????
        var $a = $newLi.find('.site > a');
        // ??????????????????
        // $('.website>ul').prepend($newLi);  // ??????????????????
        $('.website>ul').append($newLi); // ??????????????????
        getTitleFavicon($a[0]);
    });
});

// ????????????????????????
$('.search > button').on('click', function (e) {
    window.location.href = searchUrl + $('.search > input').val();
});

// ??????????????????
$('.engine > a').on('click', function (e) {
    searchUrl = searchList[e.target.name];
    // ??????????????????
    $('.engine > a').each(function (index, item) {
        $(item).removeClass('checked');
    });
    $(this).addClass('checked');
});

// ?????????????????????????????????????????????????????????????????????
$('.website>ul').on('click', function (e) {
    // ?????????ul????????????????????????
    e.preventDefault();
    // ????????????????????????
    if ($(e.target).attr('class') === 'delete') {
        $(e.target).parent().parent().parent().remove();
        var href = $(e.target).parent()[0].href;
        hashMap.forEach(function (item, index) {
            if (item.url === href) {
                hashMap.splice(index, 1);
            }
        });
        // ????????????????????????json??????localstorage
        window.localStorage.setItem('sites', JSON.stringify(hashMap));
    } else if (e.target === this) {} else {
        // ??????????????????????????????????????????
        // console.log(e.target);
        end = new Date();
        // ???????????????????????????300????????????
        if (end - start <= 300) {
            var clickTag = $(e.target);
            // ?????????a??????????????????
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
    // ?????????ul????????????????????????
    e.preventDefault();
    end = new Date();

    // ???????????????????????????
    if ($(e.target).attr('class') !== 'delete') {
        // ??????????????????????????????300m????????????
        if (end - start >= 300) {
            if ($(e.target).parent().find('.site-title')[0] !== undefined) {
                $(e.target).parent().find('.site-title')[0].textContent = prompt('??????:');
                hashMap.forEach(function (item) {
                    if (item.url === $(e.target).parent().find('.url')[0].textContent) {
                        item.title = $(e.target).parent().find('.site-title')[0].textContent;
                    }
                });
                // ????????????????????????json??????localstorage
                window.localStorage.setItem('sites', JSON.stringify(hashMap));
            }
        }
    }
});

// ????????????????????????
$('.add').on('click', function () {
    var url = prompt('??????????????????');
    var checkStr = /^https:\/\//g;
    if (url === null || url === undefined || url === '') {
        return;
    } else {
        if (!checkStr.test(url)) {
            url = 'https://' + url;
        }
        var $newLi = $("\n        <li>\n            <div class=\"site\">\n                <a href=\"" + url + "\">\n                    <div class=\"logo\">\n                        <img src=\"#\" alt=\"\">\n                    </div>\n                    <div class=\"detail\">\n                        <div class=\"site-title\">\u256E(\u256F\u25BD\u2570)\u256D  \u957F\u6309\u547D\u540D</div>\n                        <div class=\"url\">" + url + "</div>\n                    </div>\n                    <div class=\"delete\">\u5220\u9664</div>\n                </a>\n            </div>\n        </li>\n        ");
        // a??????
        var $a = $newLi.find('.site > a');
        // ??????????????????
        // $('.website>ul').prepend($newLi);  // ??????????????????
        $('.website>ul').append($newLi); // ??????????????????
        // ?????????????????????????????????
        getTitleFavicon($a[0]);
        // ????????????????????????
        hashMap.push({
            logo: 'https://api.xinac.net/icon/?url=' + url,
            title: $newLi.find('.site-title')[0].textContent,
            url: url
        });
        // ????????????????????????json??????localstorage
        window.localStorage.setItem('sites', JSON.stringify(hashMap));
    }
});

// ???????????????
// $('.website>ul').on('longTap',function(e){
//     alert('?????????')
// })

// $('.website>ul>li').on('touchend',function(e){
//     console.log(e);
// })

// ??????api????????????????????????
function getTitleFavicon(item) {
    // ????????????favicon
    $(item).find('.logo img')[0].src = 'https://api.xinac.net/icon/?url=' + item.href;
}

// ??????????????????hashMap
// window.onbeforeunload = ()=>{
//     window.localStorage.setItem('sites',JSON.stringify(hashMap));
// }


// ???????????? ??????????????????
$(document).on('keypress', function (e) {
    if (e.key === 'Enter') {
        $('.search > button').click();
    }
});
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.cb9b6653.map