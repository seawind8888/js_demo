interface Value {
    a: number,
    b: string
}
function main<Value>() {
    return {
        a:1,
        b: '2'
    }
}

console.log(main())