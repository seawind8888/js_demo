const mongoose = require('mongoose');
const asyncMongo = require('./async-mongoose.js')
mongoose.connect('mongodb://localhost:27017/test',{useNewUrlParser: true});

const TestModule = mongoose.model('Test', new mongoose.Schema({
    name: String
}));
async function start() {
    try {
        await asyncMongo({
            model: TestModule,
            method: 'create',
            key: {name: 111}
        })
        await asyncMongo({
            model: TestModule,
            method: 'updateOne',
            key: {name: 222}
        })
        
    } catch (error) {
        
    }    
}
start()
