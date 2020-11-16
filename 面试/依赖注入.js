
    function one(a) {
        this.a = a;
    }
    one.prototype.two = function (b) {
        return two(b);
    };
    var abc = {
        'aa' : function () {return '123'},
        'bb' : function () {return '456'},
        'cc' : function () {return '789'},
        'dd' : function () {return '000'}
    };
    var start = new one(abc);
    var end = start.two(function(aa,bb,cc){
       return aa();
    })