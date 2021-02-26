const obj = {};

Object.defineProperty(obj, 'a', {
  value: 42,
  enumerable:true,
  writable: false,
  configurable: true
});

obj.a = 77;
// throws an error in strict mode

delete obj.a
console.log(obj.a);
console.log(obj)
// expected output: 42
