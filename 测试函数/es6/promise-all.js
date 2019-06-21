var p1 = new Promise((resolve, reject) => {
  console.log('p1')
  resolve('p1')
})
var p2 = new Promise((resolve, reject) => {
  console.log('p1')
  reject()
})
Promise.all([p1,p2,p1]).then((res) => {
  console.log(res)
})