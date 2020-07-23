function encryption(s) {
    var textArray = s.split(" ");
    var len = 0;
    var str = "";
    for (var x of textArray) {
        len = len + x.length;
        str = str + x;
    }
    var rows = Math.floor(Math.sqrt(len));
    var cols = Math.ceil(Math.sqrt(len));
    if (rows * cols < len) {
        rows++;
    }
    var arr = new Array(rows);
    var j = 0;
    for (var i = 0; i < arr.length; i++) {
        if (j + cols < str.length) {
            arr[i] = [str.substring(j, j + cols)];
        } else {

            arr[i] = [str.substring(j)];
            break;
        }
        j = j + cols;
    }
    var output = "";
    for (var i = 0; i < cols; i++) {
        var temp = "";
        for (var row = 0; row < rows; row++) {
            var p = arr[row];
            if (p[0][i] != undefined)
                temp = temp + p[0][i];
        }

        output = output + temp + " ";
    }
    return output;
}
console.log(encryption('haveaniceday'))