const mongoose = require('mongoose');

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

function update(method = '', key = {}, value = {}) {
    return new Promise((resolve, reject) => {
        PersonModel[method](key, value ,{upsert: true},(err) => {
            if(err) {
                reject(err)
            } else {
                resolve()
            }
        })
    }) 
}
async function start () {
    await update('updateOne', {name: "111"}, {list: [{create_at: '222', update_at: []}]})
    await update('updateOne',{"list.create_at":'222'},{
        '$set': {
            'list.$.create_at': '222'
        },
        '$push': {
            'list.$.update_at': [{aaa:'bbb'},{aaa:'ccc'}]
        }
    })
}
start()