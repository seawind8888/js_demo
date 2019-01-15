function parseInt(s, radix = 10) {
    // 不是string类型立刻NaN
    if (typeof s !== 'string') {
        return NaN;
    }
    // 进制必须为2到36的数字
    if (typeof radix !== 'number' || radix < 2 || radix > 36) {
        return NaN;
    }
    // 结果初始值为0
    let result = 0;
    // 循环字符串中的每一个字符转为 Unicode 编码
    for (let i = 0; i < s.length; i += 1) {
        let c = s.charCodeAt(i);
        // 小写大写字母转换为数字
        if (c >= 97) {
            c -= 87;    // - 'a' + 10
        } else if (c >= 65) {
            c -= 55;    // - 'A' + 10
        } else {
            c -= 48;    // - '0'
        }
        // 如果字母转化后的值大于进制数，则跳出循环返回之前的结果
        if (c >= radix) {
            if (i === 0) {
                return NaN;
            }
            break;
        }
        // 结果累加，和进制相关
        result = (result * radix) + c;
    }

    return result;
}
console.log(parseInt("1111", 2))