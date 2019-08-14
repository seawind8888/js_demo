
function start (x) {
    this.x = x
    return this
}

start.prototype.add = (y) => {
    return this.x + y
}

start(1).add(2)