const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentsSchema = new mongoose.Schema({
    title: { type: String, required: true },

    date: {
        type: Date,
        default: Date.now
    },
    user: {
        ref: 'users',
        type: Schema.Types.ObjectId
    },
    post: {
        ref: 'posts',
        type: Schema.Types.ObjectId
    }
});


module.exports = mongoose.model('comments', commentsSchema);
