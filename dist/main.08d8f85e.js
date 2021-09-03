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
var $siteList = $(".siteList"); /*选择div插入地点*/
var $lastLi = $siteList.find("li.last"); /*新增div插入位置查询*/
var x = localStorage.getItem("x"); //从localStorage中取出字符串
var xObject = JSON.parse(x); //将字符串还原成对象
var hashMap = xObject || [{ logo: "A", url: "https://www.acfun.cn" }, { logo: "B", url: "https://www.bilibili.com" }]; //数组中包含哈希表来存储网页需要的数据，同时判断xObject是否为空(第一次使用肯定为空)
var simplifyUrl = function simplifyUrl(url) {
  return url.replace("https://", "").replace("http://", "").replace("www.", "").replace(/\/.*/, ""); //正则表达式,删除/之后的东西
};
var render = function render() {
  $siteList.find("li:not(.last)").remove();
  hashMap.forEach(function (node, index) {
    var $li = $("<li>\n    <div class=\"site\">\n     <div class=\"logo\">" + node.logo + "</div>\n      <div class=\"link\">" + simplifyUrl(node.url) + "</div>\n      <div class=\"close\">\n      <svg class=\"icon\">\n                <use xlink:href=\"#icon-guanbi\"></use>\n              </svg>\n      </div>\n    </div>\n    </li>").insertBefore($lastLi);
    $li.on("click", function () {
      window.open(node.url);
    }); //用监听实现跳转
    $li.on("click", ".close", function (e) {
      e.stopPropagation();
      hashMap.splice(index, 1);
      render();
    }); //阻止冒泡
  });
}; //render是用来渲染哈希列表，简单来说就是把哈希表中存储的数据赋值到render函数创建的元素上
render();

$(".addButton").on("click", function () {
  var url = window.prompt("请问你要添加的网址是什么");
  if (url.indexOf("http") !== 0) {
    url = "https://" + url;
  } /*判断网址格式是否正确，补全网址 */
  hashMap.push({
    logo: simplifyUrl(url)[0].toUpperCase(),
    url: url
  }); //直接把新的网址和数据传入哈希存储中
  render(); //然后重新渲染
});

window.onbeforeunload = function () {
  var string = JSON.stringify(hashMap); //对象变成字符串
  localStorage.setItem("x", string); //将字符串传入localStorage中
}; //判断是否要关闭页面

$(document).on("keypress", function (e) {
  // const key = e.key;等价
  var key = e.key;

  for (var i = 0; i < hashMap.length; i++) {
    if (hashMap[i].logo.toLowerCase() === key) {
      window.open(hashMap[i].url);
    }
  }
  console.log(key);
});
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.08d8f85e.map