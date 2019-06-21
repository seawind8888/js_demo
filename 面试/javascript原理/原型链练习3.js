

function one() {
    this.a = 'a';
    var b = 'b';
    this.c = function() {
        console.log(this.a)
        console.log(b)
    }
    
}

one.prototype.two = function () {
    console.log(this.c());
    console.log(this.a);
    console.log(this.b);
};
var aa = new one()

aa.two();
