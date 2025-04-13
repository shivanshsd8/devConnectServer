const Post = require('../../ models/Post')
const User = require('../../ models/User')


async function getALlPosts(req, res) {
    try {
        const posts = await Post.find({});
        if (posts.length > 0) {return res.json({posts})}
        return res.json({ message: "No posts to show!"})
    }
    
    catch (err) {
        return res.json({
            message: "Error fetching all posts!",
            error: err
        })
    }
}

module.exports = { getALlPosts }