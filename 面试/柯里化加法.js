function add(a) {
  var sum = 0;
  sum += a;
  return function temp(b) {
    if (arguments.length === 0) {
      return sum;
    } else {
      sum = sum + b;
      return temp;
    }
  };
}
console.log(add(2, 3)(3)(4)(5)()); //14
// currying(1)(2)(3)
