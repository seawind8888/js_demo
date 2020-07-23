function miniMaxSum(arr) {
    let sum = 0,
        min = arr[0],
        max = arr[0],
        maxSum,
        minSum
   
    for(let i=0; i<arr.length; i++) {
        sum += arr[i]
        if(min > arr[i]) {
             min = arr[i]
         }
        if(max < arr[i]) {
            max = arr[i];
        }
     }
     minSum = sum-max
     maxSum = sum-min
    
     console.log(`minSum:${minSum},maxSum: ${maxSum}`)
}

miniMaxSum([ 1, 3, 5, 7, 9 ] )