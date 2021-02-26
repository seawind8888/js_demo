class Stack {
    constructor() {
        this.dataStore = [];
        this.top = 0;
    }


    push(element) {
        this.dataStore[this.top++] = element;
    }

    pop() {
        return this.dataStore[--this.top];
    }

    peek() {
        return this.dataStore[this.top - 1];
    }

    length() {
        return this.top;
    }

    clear() {
        this.top = 0;
    }
    
}

var s = new Stack();
s.push('aaaaa');
s.push('bbbbb');
s.push('ccccc');
s.push('ddddd');

console.log('length: ' + s.length());
console.log('first value:' + s.peek());