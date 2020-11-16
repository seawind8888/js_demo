var pinyin = require("pinyin");
console.log(pinyin("陕西", {
    style: pinyin.STYLE_NORMAL           // 启用多音字模式
  }));   