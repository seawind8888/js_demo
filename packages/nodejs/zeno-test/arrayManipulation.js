function arrayManipulation(n, queries) {
    let sum = 0,
        stack = [n],
        m = 3

    for (let i = 0; i < n; i++) {
        stack[i] = 0;
    }
    for (let i = 0; i < m; i++) {
        let left = queries[i][0],
            mid = queries[i][1],
            right = queries[i][2];

        stack[left - 1] += right;
        if (mid < n) stack[mid] -= right;
    }
    let t = 0;

    for (let i = 0; i < n; i++) {
        t += stack[i];
        if (t > sum) sum = t;
    }
    return sum;
}

console.log(arrayManipulation(2,[
    [1, 2, 100],
    [2, 5, 100],
    [3, 4, 100]
]))