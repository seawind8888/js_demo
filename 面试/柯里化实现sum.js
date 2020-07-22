// 实现1
function sum () {
    var _sum = 0
    var _args = [...arguments]
    _args.forEach(e => {
        _sum += e
    });
    return function temp () {
        if(!arguments.length) {
            return _sum
        } else {
            var __args = [...arguments]
            __args.forEach(e => {
                _sum += e
            });
            return temp
        }
    }

}

console.log(sum(1,2,3)(4)(5)())

// // 实现2
// function add () {
//     let _args = [];
//     return function () {
//         if (arguments.length === 0) {
//             return _args.reduce(function (a, b) {
//                 return a + b;
//             });
//         }
//         [].push.apply(_args, [].slice.call(arguments));
//         console.log(_args)
//         return arguments.callee;
//     }
//   }; 
  
//   var sum = add();
//   console.log(sum(1,2,3,4,5)(6)(7)())