const fs = require("fs");
const path = require('path')
const XlsxTemplate = require('xlsx-template-ex');

const data = {
    reportBuildDate: 1526443275041,

    results: [
        { text: 'some text 1', answerText: 'a text of an answer 1'},
        { text: 'some text 2', answerText: 'a text of an answer 2'},
        { text: 'some text 3', answerText: 'a text of an answer 3'},
        { answerText: 'a text of an answer 3'},
    ],
};

XlsxTemplate.xlsxBuildByTemplate(data, path.join(__dirname, 'template1.xlsx'))
    .then((buffer) => fs.writeFileSync('./out.xlsx', buffer))
    .catch((error) => console.log('xlsxHelper error:', error));