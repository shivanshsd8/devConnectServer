const Post = require('../../ models/Post');
const User = require('../../ models/User');

async function savePost(req, res) {
    const postId = req.params.postId;
    const userId = req.userId;

    try {
        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({ message: "Post not found!" });

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found!" });

        const alreadySaved = user.savedPosts.includes(postId);

        if (alreadySaved) {
            await User.findByIdAndUpdate(userId, { $pull: { savedPosts: postId } });
        } else {
            await User.findByIdAndUpdate(userId, { $addToSet: { savedPosts: postId } });
        }

        return res.status(200).json({
            message: alreadySaved ? "Unsaved Post" : "Saved Post"
        });
    } catch (err) {
        console.error('Error in saving post:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = { savePost };
