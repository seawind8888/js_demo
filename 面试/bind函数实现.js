var foo = {
    value: 1
}
function Foo () {
    console.log(this.value)
}

Function.prototype._bind = function(context) {
    var _self = this
    return function() {
        return _self.apply(context)
    }
}
var bind = Foo._bind(foo)
console.log(bind())