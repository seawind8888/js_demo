// function serialize(arr) {
//     const stack = []
//     function _serialize(_arr) {
//         _arr.forEach(e => {
//             if(Array.isArray(e)) {
//                 return _serialize(e)
//             } else {
//                 stack.push(e) 
//             }
//         });
//     }
//     arr.forEach(e => {
//         if(Array.isArray(e)) {
//             _serialize(e) 
//         } else {
//             stack.push(e)  
//         }
//     });
//     return stack
// }

function flatten (arr) {
    return arr.reduce((acc, next) => {
        return acc.concat(Array.isArray(next)?flatten(next):next)
    },[])
}

const array = [1,2,[3,4,[5,6,[7,8]]]]

// console.log(serialize(array))

console.log(flatten(array))




