import chalk from 'chalk'
import { cmd } from ''

async function installNpmDepends(path) {
    console.log()
    console.log(chalk.bgGreen(`正在安装NPM依赖，请稍后...`))
    await cmd(`cd ${path} && npm install`, {
        tips: '安装NPM依赖失败',
        detail: `(请自行进入项目录，运行npm install 或 yarn)`,
        force: true
    })
    console.log()

}

export {
    installNpmDepends
}
