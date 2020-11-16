function aa() {console.log(arguments)}

const list = []

const fn = (() => { return function () {return aa()}})()

function test() {
    list.push(fn)
} 

function _test() {
    list.forEach(e => {
        e.call(this, arguments)
    })
}

test()
_test()
