function Listener () {
    this.queue = {}
}

Listener.prototype.pub = function (key, args) {
    if(!this.queue[key].length) return;
    this.queue[key].forEach(element => {
        element.call(this, args)
    });
}
Listener.prototype.sub = function (key, fn) {
    if(!this.queue[key]) {
        this.queue[key] = [fn]
    } else {
        this.queue[key].push(fn)
    }
    // this.queue[key] = this.queue[key]?[fn]:[...this.queue[key],fn]
}
var listen = new Listener()
listen.sub('aaa',function() {console.log(111)})
listen.sub('aaa',function(e) {console.log(e)})
listen.pub('aaa','222')
