function identity<T>(arg: T): T {
    return arg;
}

let output = identity<string>("myString");

let _output = identity("myString"); 
console.log(_output)