function quickSort(arr) {
    if(arr.length <= 1) return arr;
    var midIndex = Math.floor(arr.length) / 2
    var midVal = arr.splice(midIndex,1)[0]
    var left = []
    var right = []
    for(let i = 0; i < arr.length; i++) {
        if(arr[i] < midVal) {
            left.push(arr[i])
        } else if (arr[i] > midVal) {
            right.push(arr[i])
        }
    }
    return [...quickSort(left), midVal, ...quickSort(right)]


}

console.log(quickSort([3,7,1,2,9,10]))