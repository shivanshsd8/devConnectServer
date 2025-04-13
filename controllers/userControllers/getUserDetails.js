const Post = require('../../ models/Post');
const User = require('../../ models/User');

async function getUserDetails(req, res) {
    try {
        const userId = req.userId;

        const userDetails = await User.findById(userId);
        const postCount = await Post.countDocuments({ author: userId });

        // Fetch all posts that the user has liked
        const likedPosts = await Post.find({ likes: userId }).select('_id');

        return res.json({
            id: userDetails._id,
            name: userDetails.name,
            username: userDetails.username,
            bio: userDetails.bio,
            profileImage: userDetails.profileImage,
            followersCount: userDetails.followers.length,
            followingCount: userDetails.following.length,
            postCount: postCount,
            savedPosts: userDetails.savedPosts,
            likedPosts: likedPosts.map(post => post._id), // Just send array of post IDs
        });

    } catch (err) {
        return res.status(500).json({
            message: "Some error occurred!",
            error: err.message
        });
    }
}

module.exports = getUserDetails;
