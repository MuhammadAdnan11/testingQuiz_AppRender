const express = require('express');
const router = express.Router();
const multer = require('multer');
const Gallery = require('../models/Gallery');

const upload = multer({ dest: 'uploads/' });

// API: Get all images grouped by event
router.get('/api/gallery', async (req, res) => {
    const images = await Gallery.find();
    const grouped = {};

    images.forEach(img => {
        if (!grouped[img.event]) grouped[img.event] = [];
        grouped[img.event].push(img.imageUrl);
    });

    res.json(grouped);
});

// Admin upload: Upload new gallery image
router.post('/admin/gallery/upload', upload.single('image'), async (req, res) => {
    const { event } = req.body;
    const imageUrl = `/uploads/${req.file.filename}`; // make sure to serve this folder

    const newImage = new Gallery({ event, imageUrl });
    await newImage.save();

    res.redirect('/admin/gallery'); // or wherever your admin page is
});

module.exports = router;
