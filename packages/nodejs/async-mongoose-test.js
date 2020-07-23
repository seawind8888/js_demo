const mongoose = require('mongoose');
const asyncMongo = require('./async-mongoose.js')
mongoose.connect('mongodb://localhost:27017/test',{useNewUrlParser: true});

const TestModule = mongoose.model('Test', new mongoose.Schema({
    name: String,
    list: [
        {
            create_at: String,
            update_at: [{aaa: String}]
        }
    ]
}));
async function start() {
    try {
        await asyncMongo({
            model: TestModule,
            method: 'create',
            key: {name: "111"}
        })
        // await asyncMongo({
        //     model: TestModule,
        //     method: 'updateOne',
        //     key: {name: 222}
        // })
        // let doc = await asyncMongo({
        //     model: TestModule,
        //     method: 'updateOne',
        //     key:  {name: "111"},
        //     options: {upsert: true},
        //     value: {list: [{create_at: '222', update_at: []}]}
        // })
        //   console.log(doc)
        
    } catch (error) {
        
    }    
}
start()
