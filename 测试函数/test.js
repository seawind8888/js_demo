var value = 'aaaa11111'
var passwordRegex = /^(?=.*[a-zA-Z])(?=.*\\d)[\\s\\S]{8,}$/;
                    var pReg = new RegExp(passwordRegex);
console.log(pReg.test(value))