const bcrypt = require('bcrypt');
const User = require('../../ models/User')
require('dotenv').config();

async function signup(req, res) {
    try {
        const { username, email, password, name, bio, profileImage } = req.body;
        // Zod Validation here:

        const userExists = await User.findOne({ username })
        if (userExists) { return res.status(400).json({ message: "User already exists" }) }
        const hashedPassword = await bcrypt.hash(password, 12)
        const newUser = await User.create({ username, email, password: hashedPassword, name, bio, profileImage })
        return res.json({
            newUser
        })
    }
    catch (err) {
        return res.status(401).json({
            message: "Something went wrong",
            error: err
        })
    }
}

module.exports = signup