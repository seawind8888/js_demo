
  var obj = {
    name: '111'
  }
  Object.defineProperty(obj, 'name', {
    enumerable : true,
    configurable : true,
    get:function () {
      
      return '111'

    },
    set:function (val) {
      console.log('set' + val)
    }
  })
  obj.name = '222'