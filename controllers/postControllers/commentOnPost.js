const Post = require('../../ models/Post')
const Comment = require('../../ models/Comment')

async function commentOnPost(req, res) {
    try {
        const postId = req.params.postId;
        const userId = req.userId;
        const commentText = req.body.text;

        if(!commentText || typeof commentText !== 'string'){
            return res.status(400).json({message:"Invalid Or Empty Comment"})
        }
        
        const post = await Post.findById(postId);
        if (!post) { return res.json({ message: "Post not found!" }) }

        const commentExists = await Comment.findOne({ postId, author: userId })

        if (commentExists) {
            // Edit comment login
            commentExists.text = commentText;
            await commentExists.save();

            return res.status(200).json({
                message: "Comment updated!",
                updatedComment: commentExists
            })
        }
        else {
            const newComment = await Comment.create(
                {
                    author: userId,
                    postId: postId,
                    text: commentText
                }
            )
            const updatedPost = await Post.findByIdAndUpdate(
                { _id: postId },
                { $addToSet: { comments: newComment._id } },
                {new:true}
            )

            return res.json({
                message:"Comment added",
                updatedPost:updatedPost,
                newComment:newComment
            })
        }
    }
    catch (err) {
        return res.json({
            message: "Some error occured!",
            error: err
        })
    }

}

module.exports = { commentOnPost }