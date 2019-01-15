var task = []
function timer(i) {
// var self = this
(function() {
setTimeout(() => {
console.log(i)
// self.next()
}, i * 1000)
})(i)
// task.push(fn)
// setTimeout(() => {
// self.next()
// },0)
return this
}
timer.prototype.next = function () {
var fn = task.shift()
fn()
}
// function timer(i) {
// return new _timer(i)
// }
timer(3).timer(3).timer(2)