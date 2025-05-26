const express = require('express');
const router = express.Router();
const multer = require('multer');
const Gallery = require('../models/Gallery');
const path = require('path');

// Custom storage to keep original filenames
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });

// API: Get all images grouped by event, with full URLs
router.get('/api/gallery', async (req, res) => {
    const images = await Gallery.find();
    const grouped = {};

    const baseUrl = `${req.protocol}://${req.get('host')}`;

    images.forEach(img => {
        if (!grouped[img.event]) grouped[img.event] = [];
        grouped[img.event].push(`${baseUrl}${img.imageUrl}`);
    });

    res.json(grouped);
});

// Admin upload: Upload new gallery image
router.post('/admin/gallery/upload', upload.single('image'), async (req, res) => {
    const { event } = req.body;
    const imageUrl = `/uploads/${req.file.filename}`;

    const newImage = new Gallery({ event, imageUrl });
    await newImage.save();

    res.redirect('/admin/gallery');
});

module.exports = router;
