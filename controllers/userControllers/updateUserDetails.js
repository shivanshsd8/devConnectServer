const User = require('../../ models/User');
const bcrypt = require('bcrypt');

const updateUserDetails = async (req, res) => {
    const userId = req.userId;
    const allowedUpdates = ['email', 'name', 'bio', 'profileImage', 'password'];
    const updates = Object.keys(req.body);

    const isValidUpdate = updates.every((key) => allowedUpdates.includes(key));
    if (!isValidUpdate) {
        return res.status(400).json({ message: "Invalid updates in request" });
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        for (let key of updates) {
            if (key === 'password') {
                const salt = await bcrypt.genSalt(12);
                user.password = await bcrypt.hash(req.body.password, salt);
                // const hashedPassword = await bcrypt.hash(password, 12)
            } else {
                user[key] = req.body[key];
            }
        }

        const updatedUser = await user.save();

        res.status(200).json({
            message: "User details updated successfully",
            data: {
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                bio: updatedUser.bio,
                profileImage: updatedUser.profileImage,
            },
        });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({
            message: "An error occurred while updating user details",
            error: error.message,
        });
    }
};

module.exports = updateUserDetails;
