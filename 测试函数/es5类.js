function Super () {
  this.a = 1
}
Super.prototype.B = function () {
  console.log(this.a)
}
function Sub() {
  Super.call(this);
}
Object.create(Super.prototype, {
    constructor: {
      value: Sub,
      enumerable: false,//不能枚举
      writable: true,
      configurable: true
    }
  });

var s = new Sub()
s.B()