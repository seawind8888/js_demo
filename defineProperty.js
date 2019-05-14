var obj = {
  name: '111'
}
Object.defineProperty(obj, 'name', {
  enumerable: true,
  configurable: true,
  get: function (a,b,c) {
    console.log(`get ${a}; ${b}; ${c}`)
    return 'get111'

  },
  set: function (val,b,c) {
    console.log(`get ${val}; ${b}; ${c}`)
    console.log('set' + val)
  }
})
obj.name = '222'