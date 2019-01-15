var obj = {}
var _proxy = new Proxy(obj, {
  get: function (target, name) {
    if (!target.name) {
      return function () {
        console.log(`fun-${name}`)
      }
    }
  }
})