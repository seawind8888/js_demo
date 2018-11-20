function diagonalDifference(arr, n) {
    var sumOne = 0
    var sumTwo = 0
    for (var i = 0; i < n; i++) {
        sumOne += arr[i][i]
        sumTwo += arr[i][(n-1)-i]
    }
    return Math.abs(sumOne - sumTwo)
}

console.log(diagonalDifference([[11, 2, 4],[4, 5, 6],[10, 8, -12]],3))