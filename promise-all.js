
let promiseCount = 0
var p = () => {
  promiseCount++
  console.log(promiseCount)
  return new Promise((resolve, reject) => {
    if(promiseCount < 5) {
      resolve(promiseCount)
    } else {
      reject(error)
    }
  })
}
Promise.all([p,p,p,p,p,p,p]).then(() => {
  console.log('then')
})