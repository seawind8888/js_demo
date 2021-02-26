// var obj = {
//   a: 1,
//   b: 2,
//   c: 3
// }
// let stack = []
// var _proxy = new Proxy(obj, {
//   get: function (obj, key) {
//     console.log('[get - obj]', obj)
//     console.log('[get - key]',key)
//     stack.push(key)
//     return true
//   },
//   set: function (obj, key, value) {
//     console.log('[set - obj]', obj)
//     console.log('[set - key]',key)
//     console.log('[set - value]',value)
//     obj[key] = value;
//     return true
//   }
// })

// _proxy.a = 3

const createProxyHandler = () => {
  return {
    get (target, key, receiver) {
      if (typeof target[key] === 'object' && target[key] !== null) {
        console.log(11)
        return new Proxy(target[key], createProxyHandler())
      }
      return Reflect.get(target, key, receiver)
    },
    set (target, key, value, receiver) {
      // setTimeout(() => {
      //   getPathContext().context.forceUpdate()
      // }, 0)
      return Reflect.set(target, key, value, receiver)
    }
  }
  
}




const p = new Proxy({}, createProxyHandler())
p.a = [1,2,3]

console.log('[p]',p.a)