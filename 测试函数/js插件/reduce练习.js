
  var arr = [1,2,3,4,5,6]
  arr.reduce((prev, curr, currIndex, arry) => {
    console.log(prev)
    return prev + curr
  }, 2)