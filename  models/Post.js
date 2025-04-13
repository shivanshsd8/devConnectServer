const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    // UserId of the user who posted the post:
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    imageUrl: { type: String, default: '' },
    // Array of users who liked the post:
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
}, { timestamps: true })

const Post = mongoose.model('Post', postSchema);
module.exports = Post;