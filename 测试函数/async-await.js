function fetch(count) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(count)
    }, 1000)
  })
}


async function test() {
  for (let i = 0; i < 5; i++) {
    console.log(await fetch(i))
  }
}

test()