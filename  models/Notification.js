const mongoose = require('mongoose');

const notificationsSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    notificationType: { type: String, enum: ['like', 'comment', 'follow'], required: true },
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
    seen: { type: Boolean, default: false },
}, { timestamps: true })


const Notification = mongoose.model('Notification', notificationsSchema);
module.exports = Notification;