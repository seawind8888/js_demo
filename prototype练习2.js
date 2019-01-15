function Foo() {
  this.a = 1
  this.foo = function () {
    console.log('aaaa')
  }

}
Foo.prototype.doo = function (val) {
  this.a += val
  console.log(this.a)
  return this
}
Foo.prototype.eoo = function (val) {
  this.a -= val
  console.log(this.a)
  return this
}
var F = new Foo()

  <
  /html>