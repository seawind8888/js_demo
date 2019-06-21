const puppeteer = require('puppeteer');

(async () => {
   const browser = await puppeteer.launch({
    headless: false, //默认为true（无头），不显示浏览器界面
    slowMo :200, //减速显示，有时会作为模拟人操作特意减速
    devtools: true //显示开发者工具。页面宽高默认800*600,把开发者工具显示再隐藏页面会占满屏幕，有没有大佬解释下？
  });
  //生成Page对象
  //const page = await browser.newPage();//官网写法：一打开浏览器会打开两个tab，第二个才是你正在操作的tab
  const page = (await browser.pages())[0]; //这是我的写法，只有一个tab
  await page.goto('https://www.juejin.com'); //跳转到掘金
 //请开始你的表演...

  await browser.close(); //关闭浏览器
})();