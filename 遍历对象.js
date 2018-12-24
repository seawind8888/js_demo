var tarrgetObj = {
    a: {
        b: {
            c: {
                d: {
                    e: {
                        name: "百度"
                    }
                },
                l: {
                    name: "李鹏--> QQ:3206064928"
                }
            }
        }
    },
    d: "90",
    e: "90",
    l: {
        a: {
            b: {
                c: {
                    version: "1.0.0.1",
                    name: "李鹏--> QQ:3206064928"
                }
            }
        }
    },
    f: {
        name: "李鹏--> QQ:3206064928",
        update: "2017年03月20日"
    }
}

function eachObject(obj) {
    var nums = 0
    for (var i in obj) {
        if (typeof (obj[i]) === "object") {
            eachObject(obj[i])
        }
        if (typeof obj[i] === "string") {
            if (obj[i].indexOf("李鹏") >= 0) {
                console.log(obj[i])
                console.log(i)
                console.log(obj)
            }
        }
    }
}
eachObject(tarrgetObj)