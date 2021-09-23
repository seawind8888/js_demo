"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fib = void 0;
function fib(n) {
    var a = 0, b = 1;
    if (n > 0) {
        while (--n) {
            var t = a + b;
            a = b;
            b = t;
        }
        return b;
    }
    return a;
}
exports.fib = fib;
//# sourceMappingURL=fib.js.map