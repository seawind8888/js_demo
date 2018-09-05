let a = {
    b: x => {
        if (x < 2) return console.log(x)
        console.log( x+ 1)
    }
}
a.b(3)