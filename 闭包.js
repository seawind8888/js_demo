function foo(){
    var local = 1
    function bar(){
      local++
      return local
    }
    return bar
  }
  
  var func = foo()
  console.log(func())