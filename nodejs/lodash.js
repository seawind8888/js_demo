const _ = require('lodash')

function createApplication () {
        console.log('createApplication')
    
}

// var initialize = (function(){
//     var instance
//     return function () {
//         if(!instance) {
//             instance = '111'
//             console.log(instance)
//         }
//     }

// })()

var initialize = (function() {
    var instance
    return function () {
        console.log('instance',instance)
        if(!instance) {
            instance = true
            createApplication()
        }
    }
   
})()
initialize();
initialize();