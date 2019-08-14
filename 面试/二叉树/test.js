

// var add = function () {
//   let sum = 0
//   console.log(sum)
//   const _arg = Array.prototype.slice.apply(arguments)
  
//   if(!_arg.length) return sum;
//   _arg.forEach(e => {
//     sum += e
//   });
//   return add

// }
// // console.log(add(1,2,3,4,5))
// add(1,2,3)(4)(5)

function add () {
  let _args = [];
  return function () {
      if (arguments.length === 0) {
          return _args.reduce(function (a, b) {
              return a + b;
          });
      }
      [].push.apply(_args, [].slice.call(arguments));
      console.log(_args)
      return arguments.callee;
  }
}; 

var sum = add();
console.log(sum(1,2,3,4,5)(6)(7)())