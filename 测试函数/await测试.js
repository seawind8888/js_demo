function sleep() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
      console.log(`Time is ${new Date()}`)
    }, 1000)
  })
}

const _p = [sleep, sleep, sleep]

async function sleepAll () {
  // for (var i = 0; i < 5; i++) {
  //   await sleep()
  // }
   for (var i = 0; i < _p.length; i++) {
    await _p[i]()
  }
}
sleepAll()

