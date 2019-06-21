function sum () {
    var _sum = 0
    var _args = [].slice.call(arguments,0)
    _args.forEach(e => {
        _sum += e
    });
    return function temp () {
        if(!arguments.length) {
            return _sum
        } else {
            var __args = [].slice.call(arguments,0)
            __args.forEach(e => {
                _sum += e
            });
            return temp
        }
    }

}

console.log(sum(1,2,3)(4)())