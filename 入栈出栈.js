class Stack {
    constructor () {
        this.queue = []
        this.top = 0
    }
    push (ele) {
        this.queue[this.top++] = ele
    }
    pop () {
        return this.queue[--this.top]
    }
    length() {
        return this.top
    }
}
var stack = new Stack()

stack.push('a')
stack.pop()
console.log(stack.length())
