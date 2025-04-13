const jwt = require('jsonwebtoken');
const User = require('../ models/User');
require('dotenv').config();

async function authMiddleware(req, res, next) {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({
                message: "You are not signed in, please signin!"
            })
        }
        const verified = jwt.verify(token, process.env.JWT_SECRET)
        const userId = verified.userId;
        
        const userExists = await User.findById(userId)
        if (!userExists) {
            return res.status(401).json({
                message: "Invalid Token , user doesn't exists"
            })
        }
        
        req.userId = verified.userId;
        next();
    }
    catch (err) {
        return res.json({ message: "Something went wrong ", error: err })
    }
}

module.exports = authMiddleware;