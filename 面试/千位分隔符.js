function transNum(num = '') {
    if(!num) return;
    const _num = String(num)
    const left = _num.split('.')[0]
    const right = _num.split('.')[1]
    const _left = left.split('').reverse()
    const len = left.length
    const temp = []
    let index = 1
    for (let item of _left) {
        
        temp.push(item)
        if(index !== len && (index % 3 === 0)) {
            temp.push(',')
        }
        index++
    }
    return temp.reverse().join('') + '.' + right
}

console.log(transNum(1234563232357.222))