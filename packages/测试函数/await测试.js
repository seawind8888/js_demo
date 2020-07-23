function sleep() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
      console.log(`Time is ${new Date()}`)
    }, 1000)
  })
}

async function sleepAll () {
  for (var i = 0; i < 5; i++) {
    await sleep()
  }
}
sleepAll()
