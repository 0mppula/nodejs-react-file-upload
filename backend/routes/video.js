const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const { getVideos, postVideo } = require('../controllers/video');

const uploadDir = path.join(__dirname, '../uploads/videos');
// Create the directory if it doesn't exist
if (!fs.existsSync(uploadDir)) {
	fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, uploadDir);
	},

	filename: function (req, file, cb) {
		// Keep original extension (e.g., .mp4, .mov)
		const ext = path.extname(file.originalname);

		// Generate unique filename + keep extension
		cb(null, Date.now() + '-' + Math.round(Math.random() * 1e9) + ext);
	},
});

const upload = multer({ storage: storage });

router.route('/').get(getVideos).post(upload.single('video'), postVideo);

module.exports = router;
