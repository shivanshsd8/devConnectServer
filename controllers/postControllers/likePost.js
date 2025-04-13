const Post = require('../../ models/Post');
const User = require('../../ models/User');

async function likePost(req, res) {
    const postId = req.params.postId;
    const userId = req.userId;

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found!" });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found!" });

    const alreadyLiked = post.likes.includes(userId);
    let updatedPost;

    if (alreadyLiked) {
        // Remove like from post
        updatedPost = await Post.findByIdAndUpdate(
            postId,
            { $pull: { likes: userId } },
            { new: true }
        );
        // Remove postId from user's likedPosts
        await User.findByIdAndUpdate(
            userId,
            { $pull: { likedPosts: postId } }
        );
    } else {
        // Add like to post
        updatedPost = await Post.findByIdAndUpdate(
            postId,
            { $addToSet: { likes: userId } },
            { new: true }
        );
    }

    return res.json({
        message: alreadyLiked ? "Removed Like" : "Post Liked",
        post: updatedPost
    });
}

module.exports = { likePost };
