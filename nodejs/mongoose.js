const mongoose = require('mongoose');
// const Promise = require('bluebird');
// Promise.promisifyAll(mongoose);

mongoose.connect('mongodb://localhost:27017/test', {
    useNewUrlParser: true
});


const PersonSchema = new mongoose.Schema({
    name: String,
    list: [{
        create_at: String,
        update_at: [{
            aaa: String
        }]
    }]
});


const PersonModel = mongoose.model('Person', PersonSchema);

async function start() {
    await PersonModel.create({
        name: 'aaa',
        list: [{
            create_at: '333',
            update_at: []
        }]
    })
    await PersonModel.updateOne({
        "list.create_at": '333'
    }, {
        '$set': {
            'list.$.create_at': '222'
        },
        '$push': {
            'list.$.update_at': [{
                aaa: 'bbb'
            }, {
                aaa: 'ccc'
            }]
        }
    }, {
        upsert: true
    }, (err) => {
        console.log(err)
    })

}

start()

// PersonModel.create({
//     name: 'aaa',
//     list: [{
//         create_at: '333',
//         update_at: []
//     }]
// }).then(() => {
// PersonModel.updateOne({"list.create_at":'333'},{
//     '$set': {
//         'list.$.create_at': '222'
//     },
//     '$push': {
//         'list.$.update_at': [{aaa:'bbb'},{aaa:'ccc'}]
//     }
// },{upsert: true},(err) => {
//     console.log(err)
// })
// })
// PersonModel.updateOne({name: 'aaa'},{
//     '$pull': {
//         'list':{create_at:'333'}
//     }
// },(err) => {
//     console.log(err)
// })


// PersonModel.find({"name": ['ccc']}).then((doc) => {
//     console.log(doc)
// })






// var cache = require('memory-cache');


// for(let i = 0; i < 5; i++) {
//     setTimeout(() => {
//         (function(){
//             // if(i <2) {
//             //     cache.put('foo', 'bar');
//             // } else {
//             //     cache.put('foo', 'hahah');
//             // }
//             console.log(cache.get('foo')) 
//         })(i)
//     },1000)
// }
// let obj = {
//   a:1,
//   b:2
// }
// obj.a++

// "value"