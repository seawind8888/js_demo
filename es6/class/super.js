class Dog {
  constructor(name) {
    this.name = name
    this.voice = 'wangwang'
  }
  speak () {
    console.log(this.voice)
  }
}
class Dogg extends Dog {
  // constructor(name) {
  //   super(name)
  // }
  speak () {
    super.speak()
  }

}
var dog = new Dogg('mike')
dog.speak()