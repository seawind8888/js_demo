function Person() {
  this.time = new Date();
}

var getInstance = (function() {
  var instance;
  return function() {
    if (!instance) {
      instance = new Person();
    }
    return instance;
  };
})();

var s1 = getInstance();
var s2 = getInstance();
console.log(s1 === s2); // true
