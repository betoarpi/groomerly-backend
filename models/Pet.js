const mongoose = require('mongoose');

const PetsSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    petType: {
        type: String,
        required: true,
        trim: true
    },
    breed: {
        type: String,
        required: true,
        trim: true
    },
    picture: {
        type: String,
        required: true,
        trim: true
    },
    created: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Pet', PetsSchema);