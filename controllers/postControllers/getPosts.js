const Post = require('../../ models/Post')

async function getPosts(req, res) {
    try {
        const userId = req.userId;
        const posts = await Post.find({ author: userId }).populate('author','username name email')

        if (posts.length > 0) { return res.json({ posts }) }
        return res.json({ message: "No posts to show!" })
    }

    catch (err) {
        return res.json({
            message: "Error occured!",
            error: err
        })
    }
}

module.exports = { getPosts }