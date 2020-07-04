const mongoose = require('mongoose');

const SalonsSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    longitude: {
        type: String,
        required: true,
        trim: true
    },
    latitude: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    hours: {
        type: String,
        required: true,
        trim: true
    },
    services: {
        type: String,
        required: true,
        trim: true
    },
    coverPicture: {
        type: String,
        required: true,
        trim: true
    },
    //Need to add a photo gallery
    created: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Salon', SalonsSchema);