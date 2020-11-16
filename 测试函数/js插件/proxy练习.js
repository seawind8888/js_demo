var obj = {
  a: 1,
  b: 2,
  c: 3
}
let stack = []
var _proxy = new Proxy(obj, {
  get: function (obj, key) {
    console.log('[get - obj]', obj)
    console.log('[get - key]',key)
    stack.push(key)
    return true
  },
  set: function (obj, key, value) {
    console.log('[set - obj]', obj)
    console.log('[set - key]',key)
    console.log('[set - value]',value)
    obj[key] = value;
    return true
  }
})

_proxy.a = 3
