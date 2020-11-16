// 实现 sum(1,2,3....,n)
function sum() {
    var _sum = 0
    var _args = [].slice.call(arguments,0)
    _args.forEach(e => {
        _sum += e
    })
    return _sum

}
console.log(sum(1,2,3,4))