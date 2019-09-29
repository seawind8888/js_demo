var obj = {
  name: [],
}
Object.defineProperty(obj, 'name', {
  enumerable: true,
  configurable: true,
  get: function (val) {
    console.log(`get ${val}`)
    return 'get111'

  },
  set: function (newVal) {
    console.log(`set ${newVal}`)
  }
})
obj.name.push(111)
console.log(obj.name)