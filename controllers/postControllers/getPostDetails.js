const Post = require('../../ models/Post')

// Get all the details of a particular post;
async function getPostDetails(req, res) {
    const postId = req.params.postId;
    const post = await Post.findById(postId)
    .populate('likes','username email')
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

module.exports = {getPostDetails}