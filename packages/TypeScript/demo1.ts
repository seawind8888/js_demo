function loggingIdentity<T>(arg: T): T {
    return arg;
}
console.log(loggingIdentity<string>('23232'))