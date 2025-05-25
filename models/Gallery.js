const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
    event: String,
    imageUrl: String,
    uploadedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Gallery', gallerySchema);
