// controllers/post/getLikedPosts.js
const Post = require('../../ models/Post');

const getLikedPosts = async (req, res) => {
    try {
        const userId = req.userId;
        const posts = await Post.find({ likes: userId }).populate('author', 'username name email profileImage');

        if (posts.length > 0) {
            return res.json({ posts });
        }

        return res.json({ message: "No liked posts to show!" });
    } catch (err) {
        console.error("Error fetching liked posts:", err);
        return res.status(500).json({
            message: "Server error",
            error: err.message,
        });
    }
};

module.exports = { getLikedPosts };
