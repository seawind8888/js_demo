
var a = 3
var obj = {
  a: 2,
  fn: function() {
    console.log(this); // {a: 2, fn: ƒ}
    console.log(this.a); // 2
    function test() {
        console.log(this) // window
    }
    test()
  }
};
