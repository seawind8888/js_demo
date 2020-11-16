
    function test () {
        var a = 1
        return function () {
            a++
            console.log(a)
        }()
    }
    
    test()
