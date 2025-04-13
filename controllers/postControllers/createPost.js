const Post = require('../../ models/Post')
const User = require('../../ models/User')

async function createPost(req, res) {
    try {
        const { content, imageUrl } = req.body;
        const author = req.userId;
        const newPost = await Post.create({ author, content, imageUrl });
        return res.json({
            newPost
        })
    }
    catch (err) {
        return res.json({
            message: "Error creating post, Try Again! ",
            error:err
        })
    }
}

module.exports = { createPost }