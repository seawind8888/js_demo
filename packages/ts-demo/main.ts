interface Value {
    a: number,
    b: string
}
function main<Value>() {
    return {
        a:1,
        b: ''
    }
}

console.log(main())