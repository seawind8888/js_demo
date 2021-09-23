const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
      headless: true, //默认为true（无头），不显示浏览器界面
      slowMo: 200, //减速显示，有时会作为模拟人操作特意减速
      devtools: true //显示开发者工具。页面宽高默认800*600,把开发者工具显示再隐藏页面会占满屏幕，有没有大佬解释下？
    });

    const page = await browser.newPage();
    page.on('console', msg => console.log('PAGE LOG:', msg.text));
    
})