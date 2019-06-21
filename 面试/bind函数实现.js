var foo = {
    value: 1
}
function Foo () {
    console.log(this.value)
}

Function.prototype.bind2 = function(context) {
    var _self = this
    return function() {
        return _self.apply(context)
    }
}
var bind = Foo.bind2(foo)
console.log(bind())