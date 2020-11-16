function add() {
    let _sum = 0
    arguments.forEach(e => {
        _sum += e 
    });
    return function _add() {
        if(!arguments.length) {
            return _sum
        }
        arguments.forEach(e => {
            _sum += e 
        });
        return _add
    }
}


console.log(add(1)(2,3)())