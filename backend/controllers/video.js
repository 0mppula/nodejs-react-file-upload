const path = require('path');
const fs = require('fs');

// @desc    Get videos from the filesystem
// @route   GET /api/video
// @access  Public
const getVideos = (req, res) => {
	// Path to uploads/videos folder
	const videosDir = path.join(__dirname, '../uploads/videos');

	// Read files from the directory
	fs.readdir(videosDir, (err, files) => {
		if (err) {
			console.error('Error reading videos folder ❌'.red, err);
			return res.status(500).send('Failed to retrieve videos.');
		}

		// Filter only video files
		const videos = files.filter((file) => {
			const ext = path.extname(file).toLowerCase();
			return ext === '.mp4' || ext === '.mov' || ext === '.mkv';
		});

		// Map to full URLs
		const baseUrl = `${req.protocol}://${req.get('host')}/uploads/videos/`;
		const videoUrls = videos.map((file) => baseUrl + file);

		res.status(200).json(videoUrls);
	});
};

// @desc    Post a video to the filesystem
// @route   POST /api/video
// @access  Public
const postVideo = (req, res) => {
	if (!req.file) {
		console.log('No video uploaded ❌'.yellow.bold);
		return res.status(400).send('No video uploaded.');
	}

	// Extract extension from original file
	const ext = path.extname(req.file.originalname).toLowerCase();

	if (ext !== '.mp4' && ext !== '.mov' && ext !== '.mkv') {
		console.log('Invalid file type ❌'.red.bold);

		// Delete the uploaded file since it's not allowed
		fs.unlink(req.file.path, (err) => {
			if (err) {
				console.error('Error deleting file:'.red, err);
			} else {
				console.log(`Deleted invalid file: ${req.file.filename} 🗑️`.gray);
			}
		});

		return res.status(400).send('Only .mp4, .mov, .mkv videos are allowed.');
	}

	console.log(`File uploaded! ✅`.green.bold);
	console.log(`Original Name: ${req.file.originalname}`.cyan);
	console.log(`Saved As: ${req.file.filename}`.yellow);
	console.log(`Size: ${req.file.size} bytes`.magenta);

	res.send('Video uploaded successfully');
};

module.exports = {
	getVideos,
	postVideo,
};
