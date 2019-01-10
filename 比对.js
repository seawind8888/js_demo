let a = [1,3,4]
let b = [1,2]
let big
let small
if(a.length < b.length) {
    big = b
    small = a
} else  {
    big = a
    small = b
}
for (let i = 0; i < big.length; i++) {
    for (let j = 0; j < small.length; j++) {
        if(a[i] !== b[j]) {
            b.splice(j, 1)
        }
    }
}
console.log('a = ',a)
console.log('b = ',b)