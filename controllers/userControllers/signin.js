const bcrypt = require('bcrypt');
const User = require('../../ models/User')
const jwt = require('jsonwebtoken')
require('dotenv').config();

async function signin(req, res) {
    try {
        const { username, password } = req.body;
        // Zod Validation here:
        const user = await User.findOne({ username });
        if (!user) { return res.status(404).json({ message: "User doesn't exist!" }) }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) { return res.status(401).json({ message: "Wrong password!" }) }
        const token = jwt.sign({ username, userId: user._id }, process.env.JWT_SECRET)
        return res.json({
            token
        })
    }
    catch (err) {
        return res.json({
            message: "Something went wrong",
            error: err
        })
    }
}

module.exports = signin