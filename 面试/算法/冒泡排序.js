function maopao(arra) {
    var temp;
    for (var i = 0; i < arra.length; i++) { //比较多少趟，从第一趟开始
        for (var j = 0; j < arra.length - i - 1; j++) { //每一趟比较多少次数
            console.log(i)
            if (arra[j] > arra[j + 1]) {
                temp = arra[j];
                arra[j] = arra[j + 1];
                arra[j + 1] = temp;
            }
        }
    };
    return arra;
}
var arrry = [85, 24, 63, 17, 31, 17, 86, 50];
var s = maopao(arrry);
console.log(s);