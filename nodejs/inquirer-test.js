const inquirer = require('inquirer')
function test() {
    return inquirer.prompt([
        {
            type: 'confirm',
            name: 'copy',
            message: 'Copy it to clipboard?',
            default: true
        }
    ]).then(e => {
        console.log(e)
    })
}

test()