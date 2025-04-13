const Post = require('../../ models/Post')
const Comment = require('../../ models/Comment');

async function deleteComment(req, res) {
    try {
        const commentId = req.params.commentId;
        const author = req.userId;

        const deletedComment = await Comment.findOneAndDelete({ _id: commentId, author });
        if (!deletedComment) { return res.json({ message: "Comment not found" }) }
        await Post.findByIdAndUpdate(
            deletedComment.postId,
            {$pull:{comments:commentId}}
        )
        return res.json({
            message:'Comment deleted successfully!'
        })
    }
    catch (err) {
        return res.json({
            message: "Error Deleting Comment!",
            error: err.message
        })
    }
}

module.exports = { deleteComment }