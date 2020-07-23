const mongoose = require('mongoose');
const asyncMongo = require('./async-mongoose')

mongoose.connect('mongodb://localhost:27017/test',{useNewUrlParser: true});

const PersonSchema = new mongoose.Schema({
    name:String,
    list: [
        {
            create_at: String,
            update_at: [{aaa: String}]
        }
    ]
});


const PersonModel = mongoose.model('Person',PersonSchema);

// function asyncMongo(method = '', key = {}, value = {}) {
//     return new Promise((resolve, reject) => {
//         PersonModel[method](key, value ,{upsert: true},(err,doc) => {
//             if(err) {
//                 reject(err)
//             } else {
//                 resolve(doc)
//             }
//         })
//     })
// }
async function start () {

        // let doc = await asyncMongo('updateOne', {name: "111"}, {list: [{create_at: '222', update_at: []}]})
        // console.log(doc)
        let doc = await asyncMongo({
            model: PersonModel,
            method: 'updateOne',
            key:  {name: "111"},
            options: {upsert: true},
            value: {list: [{create_at: '222', update_at: []}]}
        })
          console.log(doc)


    // await update('updateOne',{"list.create_at":'222'},{
    //     '$set': {
    //         'list.$.create_at': '222'
    //     },
    //     '$push': {
    //         'list.$.update_at': [{aaa:'bbb'},{aaa:'ccc'}]
    //     }
    // })
}
start()