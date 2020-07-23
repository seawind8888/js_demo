// let pubSub = {}
// pubSub.list = []
// pubSub.listen = function (key, fn) {
//     list[key] = list[key] || [];
//     list[key].push(fn);
// };

// pubSub

function PubSub () {
    this.list = {}
    this.listen = function (key, fn) {
        this.list[key] = this.list[key] || [];
        this.list[key].push(fn);
    };
    this.trigger = function (key, args) {
        if(!this.list[key].length) return;
        for(let item of this.list[key]) {
            item.call(this, args)
        }
    }
    this.off = function (key,fn) {
        this.list[key].forEach((e,i) => {
            if(e === fn) {this.list[key].splice(i,1)}
        });
    }
}
var s = new PubSub()
var fn1 = function(p) {console.log('aoo' + p)}
var fn2 = function () {console.log('boo')}
s.listen('aoo',fn1)
s.listen('aoo',fn2)
s.off('aoo',fn2)
s.trigger('aoo', 1)