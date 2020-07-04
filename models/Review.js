const mongoose = require('mongoose');

const ReviewsSchema = mongoose.Schema({
    rating: {
        type: Int,
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