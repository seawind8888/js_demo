async function test(a=0) {
  await console.log(a)
  a++
  await console.log(a)
}
test()