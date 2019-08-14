// 解法1
for (var i = 0; i< 10; i++){
    setTimeout((i) => {
    console.log(i);
    }, 1000,i)
 }

 // 解法2
 for (var i = 0; i< 10; i++){
    ((i) => {
      setTimeout(() => {
        console.log(i);
      }, 1000)
   })(i)
  }