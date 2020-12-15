import util from 'util'
import { isError } from './index'

const exec = util.promisify(require('child_process').exec);

/**
 * 
 * 子进程命令方法封装
 * @param {*} command
 * @param {*} {
 *     tips = '执行命令错误',
 *     detail = '', 
 *     authorization = false
 * }
 * @returns
 */
async function cmd(command: string, {
    tips = '执行命令错误',
    detail = '',
    authorization = false,
    force = false
} = {}) {
    try {
        const { stdout, stderr } = await exec(command)
        if (!force && stderr) {
            isError(`${tips}`, detail || stderr)
        }
        return stdout
    } catch (error) {
        isError(`${tips}:`, detail || error)
    }
}

export {
    cmd
}