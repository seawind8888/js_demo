// 将函数返回作为作为下一个函数参数

let sayHello = (...str) => `Hello , ${str.join(" And ")}`;
let toUpper = str => str.toUpperCase()
let split = str => str.split(',')

function compose(...fns) {
    return function(...arg){
        return fns.reduce((acc, cur) => {
            // 第一次acc是函数，之后是结果，所以要加个判断
            return typeof acc === 'function' ? cur(acc(...arg)) : cur(acc)
        })
    }
}

// const compose = (...fns) => (...args) => fns.reduce((acc,cur) => typeof acc === 'function' ? cur(acc(...args)) : cur(acc))

let combin = compose(
    sayHello,
    toUpper,
    split
);

console.log(combin('aaa', 'bbb'))


// compose(fn1, fn2, fn3)

// function compose(...fns) {
//     let len = fns.length
//     let res = null
//     return function fn(...arg) {
//         res = fns[len - 1].apply(null, arg) // 每次函数运行的结果
//         if(len > 1) {
//             len --
//             return fn.call(null, res) // 将结果递归传给下一个函数
//         } else {
//             return res //返回结果
//         }
//     }
// }

// compose(fn3,fn2,fn1)


// let combin = compose(
//     split,
//     toUpper,
//     sayHello
// );


// console.log(combin('aaa', 'bbb'))
