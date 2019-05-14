const fs = require('fs')
const JSZip = require('jszip')
const Docxtemplater = require('docxtemplater')
const ImageModule = require('open-docxtemplater-image-module')
　　//读取模板文件
var content = fs.readFileSync(path.join(__dirname, './doc.docx'), 'binary');
var zip = new JSZip(content);
var doc = new Docxtemplater();
var opts = {
  centered: false,
  getImage: function(tagValue, tagName) {
    console.log(__dirname);
    return fs.readFileSync(path.join(__dirname, '../data/' + tagValue));
  },
  getSize: function(img, tagValue, tagName) {
    return [150, 150];
  }
}
doc.attachModule(new ImageModule(opts))
doc.loadZip(zip);
doc.setData({
  name1: "内容已被替换1",
  name2: "内容已被替换2",
  value1: "新的值1",
  value2: "新的值2",
  image: "image1.png"
});

try {
  /*
   render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
  */
  doc.render();
} catch (error) {
  var err = {
    message: error.message,
    name: error.name,
    stack: error.stack,
    properties: error.properties,
  }
  console.log(JSON.stringify(err));
  /* 
  The error thrown here contains additional information when logged with JSON.stringify (it contains a property object).
  */
  throw error;
}

var buf = doc.getZip().generate({ type: 'nodebuffer' });
/* buf is a nodejs buffer, you can either write it to a file or do anything else with it.*/
fs.writeFileSync(path.join(__dirname, './doc.docx'), buf);