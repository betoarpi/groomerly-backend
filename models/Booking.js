const mongoose = require('mongoose');

const BookingsSchema = mongoose.Schema({
    time: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: String,
        required: true,
        trim: true
    },
    reviewed: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Booking', BookingsSchema);