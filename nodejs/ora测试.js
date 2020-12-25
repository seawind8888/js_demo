const ora = require('ora');

const _s = ora('正在安装NPM依赖，请稍后...').start()

setTimeout(() => {
    _s.succeed('11')
},2000)
