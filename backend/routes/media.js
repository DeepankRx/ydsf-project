const multer = require('multer');
const upload = multer({dest: 'uploads/'});
const mongoose = require('mongoose')
const router = require('express').Router();
const Image = require('../models/media.model');
router.post('/',upload.single('image'),(req, res, next) =>
{
    const image = req.file.destination;
    console.log(image);
    const imageData = new Image({
        image : image
    });
    imageData.save()
    .then(() => res.json('Image added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;