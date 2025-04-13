const User = require('../../ models/User');
const Post = require('../../ models/Post');

async function getSavedPosts(req, res) {
    const userId = req.userId;
    try{
        const user = await User.findById(userId).populate({
            path:'savedPosts',
            populate: [
                {
                  path: 'author',
                  select: 'username name email profileImage'
                },
                {
                  path: 'likes',
                  select: 'username email'
                },
                {
                  path: 'comments',
                  populate: {
                    path: 'author',
                    select: 'username email'
                  }
                }
              ]             
        })
        return res.json({savedPosts:user.savedPosts})
    }
    catch(err){
        return res.json({
            message:"Error fetching saved posts!"
        })
    }
}

module.exports = { getSavedPosts };
