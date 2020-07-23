
const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function _exec() {
  try {
    const {stdout, stderr} = await exec('taro -v')
    console.log(`stdout: ${JSON.stringify(stdout)}`);
    console.error(`stderr: ${stderr}`);
    if(stdout && stdout.indexOf('v2.2.6')>=0) {
      return true
    } 
  } catch (error) {
    console.error(`执行的错误: ${error}`);
  }
}

async function test() {
  if(await _exec()) {
    console.log(111)
  } else {
    console.log(222)
  }
}

test()