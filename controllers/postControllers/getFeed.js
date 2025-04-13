const Post = require("../../ models/Post");
const User = require("../../ models/User");



async function getFeed(req, res) {
    try {
        const userId = req.userId;
        // ne means not equal
        const feedposts = await Post.find({ author: { $ne: userId } })
            .sort({ createdAt: -1 })
            // Populate author to include username and email form user table 
            .populate('author', 'username name email profileImage')

            // populate likes to include user who liked and his username and email:
            .populate('likes', 'username email')
            // Populate comment now 
            .populate({
                path: 'comments',
                // but comments does not directly stores username it stores author so populate author with username and email
                populate: {
                    path: 'author',
                    select: 'username email'
                }
            })
        if (feedposts.length === 0) {
            return res.json({ message: "No posts in your feed!" })
        }
        return res.json({ feed: feedposts })
    }
    catch (err) {
        return res.json({
            message: "Error getting feed",
            error: err.message
        })
    }
}

module.exports = { getFeed }