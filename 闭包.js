function foo(){
    var local = 1
    return function bar(){
      local++
      return local
    }
  }
  
  var func = foo()
  console.log(func())