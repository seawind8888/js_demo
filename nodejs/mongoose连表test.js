const mongoose = require('mongoose');
const Schema = mongoose.Schema

mongoose.Promise = Promise
mongoose.connect("mongodb://localhost:27017/test", { useNewUrlParser: true }).catch(err => {
  console.log(`[mongoose]${err}`)
})

const userSchema = mongoose.Schema({
    name: String,
    avatar: String
});

const topicSchema = mongoose.Schema({
    title: String,
    user: {type: Schema.ObjectId, ref: 'Admin'},
});

const Topic = mongoose.model('Topic', topicSchema);
const User = mongoose.model('User', userSchema);

Topic.find().populate({path: 'user', model: User }).exec();
console.log(user)