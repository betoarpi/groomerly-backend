const mongoose = require('mongoose');

const UsersSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    position: {
        type: String,
        required: false,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    avatar: {
        type: String,
        trim: true
    },
    role: {
        type: String,
        default: "CLIENT"
    },
    permissions: {
        type: String,
        default: "USER"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'User'
    },
    business: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Business'
    },
    created: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('User', UsersSchema);