/**
 *
 *
 * @param {string} [info=''] 错误信息
 * @param {string} [desc=''] 错误详情
 */
function isError(info = '', desc = '') {
    console.log();
    console.log(chalk.bgRed(info), desc);
    console.log();
    process.exit(1)
}




export {
    installNpmDepends
}