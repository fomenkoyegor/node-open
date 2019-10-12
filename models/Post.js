const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    date: {
        type: Date,
        default: Date.now
    },
    user: {
        ref: 'users',
        type: Schema.Types.ObjectId
    }
});


module.exports = mongoose.model('posts', postSchema);
