var filepreview = require('filepreview');
const path = require('path')
// if (!filepreview.generateSync(path.join(__dirname, 'template.docx'), path.join(__dirname, 'myfile_preview.gi'))) {
//   console.log('Oops, something went wrong.');
// } else {
//   console.log('File preview is /home/myfile_preview.gif');
// };

filepreview.generate(path.join(__dirname, 'template.docx'), path.join(__dirname, 'myfile_preview.gif'), function(error) {
  if (error) {
    return console.log(error);
  }
  console.log('File preview is /home/myfile_preview.gif');
});