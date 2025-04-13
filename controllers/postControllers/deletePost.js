const Post = require('../../ models/Post')

async function deletePost(req,res) {
    try {
        const userId = req.userId;
        const postId = req.params.postId;
        const deletedPost = await Post.findOneAndDelete({_id:postId,author:userId})
        if(!deletedPost){
            return res.json({message:"Post not found / You are unauthorized for this post"});
        }
        return res.json({
            message:"Post deleted successfully!",
            postId:deletedPost._id
        })
    }
    catch (err) {
        return res.json({
            message: "Error Deleting post, Try again",
            error: err
        })
    }
}


module.exports = { deletePost }