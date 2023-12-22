const express = require('express');
const handleFileUpload = require('../controllers/upload.controller');
const multer = require('multer')();

const router = express.Router();

router.post('/upload', multer.any('Files'), handleFileUpload);


module.exports = router;