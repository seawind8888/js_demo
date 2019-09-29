var name = '111'
var foo = function () {
    console.log(this.name)
}
foo.call({name: '222'}) // '222'
foo = function () {
    this.name = '333'
    console.log(this.name)
}
foo.call({name: '222'}) // '333'
foo.bind({name: '444'})
foo()