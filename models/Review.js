const mongoose = require('mongoose');

const ReviewsSchema = mongoose.Schema({
    rating: {
        type: Number,
        required: true,
        trim: true
    },
    review: {
        type: String,
        required: true,
        trim: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    business: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Business'
    },
    service: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Service'
    },
    /* booking: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Booking'
    } */
});

module.exports = mongoose.model('Review', ReviewsSchema);