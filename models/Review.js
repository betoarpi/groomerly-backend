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
    }
});

module.exports = mongoose.model('Review', ReviewsSchema);