var _new = function() {
  let constructor = [...arguments][0];
  const obj = new Object();
  obj.__proto__ = constructor.prototype;
  let result = constructor.call(obj, ...arguments);
  return result === 'object' ? result : obj;;
};

var Dog = function(name) {
  this.name = name;
};
Dog.prototype.bark = function() {
  console.log('wangwang');
};
Dog.prototype.sayName = function() {
  console.log('my name is ' + this.name);
};
var simao = _new(Dog, 'simao');
simao.bark();
simao.sayName();
