function arrayManipulation(n, queries) {
    var max = 0;
    var data = new Array(n).fill(0);

    queries.forEach(query => {
        var start = query[0] - 1;
        var end = query[1];
        var summand = query[2];

        data[start] += summand;

        if (end < data.length) {
            data[end] -= summand;
        }
    });

    data.reduce((previous, current) => {
        var sum = previous + current;

        if (sum > max) {
            max = sum;
        }

        return sum;
    });

    return max;
}
console.log(arrayManipulation(5, [
    [1, 2, 100],
    [2, 5, 100],
    [3, 4, 100]
]))