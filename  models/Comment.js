const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    // User id who commented:
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    // Post id where the comment was made:
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
    // Actual Comment :
    text: { type: String, required: true }
}, { timestamps: true })


const Comment = mongoose.model('Comment',commentSchema);
// Some changes


module.exports = Comment;