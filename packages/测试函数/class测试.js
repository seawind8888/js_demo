
class test1 {
  constructor() {
    this.aa = '11'
  }
  test1Fun() {
    console.log('test1')
  }
  static test1Static() {
    console.log('static')
  }
}
class test2 extends test1 {
  constructor() {
    super()
    this.bb = '11'
  }
  test2Fun() {
    console.log(this.aa)
  }
}
var aa = new test1
var bb = new test2