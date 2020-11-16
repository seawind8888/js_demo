
class test1 {
  constructor() {
    this.aa = '11'
    this.bb = '22'
  }

  test1Fun() {
    console.log('test1')
    console.log(this.cc)
  }
  static test1Static() {
    console.log('static')
  }

}
class test2 extends test1 {
  constructor() {
    super()
    this.cc = '33'
   
  }
 
  test2Fun() {
    console.log(this.aa)
  }
}
var _aa = new test1()
var bb = new test2()

_aa.test1Fun()
bb.test2Fun()