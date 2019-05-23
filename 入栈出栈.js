// class Stack {
//     constructor () {
//         this.queue = []
//         this.top = 0
//     }
//     push (ele) {
//         this.queue[this.top++] = ele
//     }
//     pop () {
//         return this.queue[--this.top]
//     }
//     length() {
//         return this.top
//     }
// }
function Stack () {
    this.queue = []
    this.top = 0
    this.push =  (ele) => {
        this.queue[this.top++] = ele
    }
    this.pop = () => {
        return this.queue[--this.top]
    }
    this.length = () => {
        return this.top
    }
}
var stack = new Stack()
stack.push('a')
stack.pop()
console.log(stack.length())
