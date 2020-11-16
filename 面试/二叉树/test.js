

function pro() {
    return new Promise (_r => {
        setTimeout(() => {
            _r(123)
        },1000)
    })
}
function* gen() {
  yield pro().then(e)
  yield '123';
  yield '32';
}
var g = gen()
console.log(g.next().then(_ => {console.log(_)}))
// console.log(g.next())
// console.log(g.next())