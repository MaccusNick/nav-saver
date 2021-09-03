const $siteList = $(".siteList"); /*选择div插入地点*/
const $lastLi = $siteList.find("li.last"); /*新增div插入位置查询*/
const x = localStorage.getItem("x"); //从localStorage中取出字符串
const xObject = JSON.parse(x); //将字符串还原成对象
const hashMap = xObject || [
  { logo: "A", url: "https://www.acfun.cn" },
  { logo: "B", url: "https://www.bilibili.com" },
]; //数组中包含哈希表来存储网页需要的数据，同时判断xObject是否为空(第一次使用肯定为空)
const simplifyUrl = (url) => {
  return url
    .replace("https://", "")
    .replace("http://", "")
    .replace("www.", "")
    .replace(/\/.*/, ""); //正则表达式,删除/之后的东西
};
const render = () => {
  $siteList.find("li:not(.last)").remove();
  hashMap.forEach((node, index) => {
    const $li = $(`<li>
    <div class="site">
     <div class="logo">${node.logo}</div>
      <div class="link">${simplifyUrl(node.url)}</div>
      <div class="close">
      <svg class="icon">
                <use xlink:href="#icon-guanbi"></use>
              </svg>
      </div>
    </div>
    </li>`).insertBefore($lastLi);
    $li.on("click", () => {
      window.open(node.url);
    }); //用监听实现跳转
    $li.on("click", ".close", (e) => {
      e.stopPropagation();
      hashMap.splice(index, 1);
      render();
    }); //阻止冒泡
  });
}; //render是用来渲染哈希列表，简单来说就是把哈希表中存储的数据赋值到render函数创建的元素上
render();

$(".addButton").on("click", () => {
  let url = window.prompt("请问你要添加的网址是什么");
  if (url.indexOf("http") !== 0) {
    url = "https://" + url;
  } /*判断网址格式是否正确，补全网址 */
  hashMap.push({
    logo: simplifyUrl(url)[0].toUpperCase(),
    url: url,
  }); //直接把新的网址和数据传入哈希存储中
  render(); //然后重新渲染
});

window.onbeforeunload = () => {
  const string = JSON.stringify(hashMap); //对象变成字符串
  localStorage.setItem("x", string); //将字符串传入localStorage中
}; //判断是否要关闭页面

$(document).on("keypress", (e) => {
  // const key = e.key;等价
  const { key } = e;
  for (let i = 0; i < hashMap.length; i++) {
    if (hashMap[i].logo.toLowerCase() === key) {
      window.open(hashMap[i].url);
    }
  }
  console.log(key);
});
