function Foo() {
  this.foo = function () {
    console.log(1)
  }
}
var Foo = function () {
  this.foo = function () {
    console.log(3)
  }
}
Foo.prototype.foo = function () {
  console.log(2)
}
new Foo().foo()