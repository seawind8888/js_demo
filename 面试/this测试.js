function Foo() {
  this.a = 1;
  console.log(this);
}
Foo(); // window  默认绑定

new Foo(); // Foo {a:1}

var a = 3
var obj = {
  a: 2,
  fn: function() {
    console.log(this); // {f: 2, fn: ƒ}
    console.log(this.a); // 2
    function test() {
        console.log(this) // window
    }
    test()
  }
};
