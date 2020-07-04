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
    }
});

module.exports = mongoose.model('Booking', BookingsSchema);