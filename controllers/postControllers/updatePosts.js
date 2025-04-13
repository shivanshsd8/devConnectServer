const Post = require('../../ models/Post')

async function updatePost(req, res) {
    try {
        const postId = req.params.postId;
        const updates = req.body;
        const userId = req.userId;
        const updatedPost = await Post.findOneAndUpdate(
            { _id: postId, author: userId },
            { $set: updates },
            {new:true}
        )

        if(!updatedPost){
            return res.json({message:"Post not found!"})
        }
        
        return res.json({
            message:"Post updated!",
            updatedPost
        })
    }
    catch (err) {
        return res.json({
            message: "Error updating post, Try Again! "
        })
    }
}


module.exports = { updatePost }
