const Post = require('../../ models/Post')

async function getComments(req, res) {
    const postId = req.params.postId;
    const post = await Post.findById(postId)
    .populate({
        path:'comments',
        populate: {
            path: 'author',
            select: 'username email'
        }
    })
    
    return res.json({
        post
    })
}

module.exports = {getComments}