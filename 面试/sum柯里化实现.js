function sum(a){

    var _sum = 0;
    _sum += a; 
    
    return function temp(b) { 
    
        if (!arguments.length) {
            return _sum;
        } else {
            _sum += b;
            return temp;
        }
    }
}

console.log(sum(2)(3)(4)(5)(6)(7)()); //14