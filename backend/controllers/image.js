const path = require('path');
const fs = require('fs');

// @desc    Get images from the filesystem
// @route   GET /api/image
// @access  Public
const getImages = (req, res) => {
	// Path to uploads/images folder
	const imagesDir = path.join(__dirname, '../uploads/images');

	// Read files from the directory
	fs.readdir(imagesDir, (err, files) => {
		if (err) {
			console.error('Error reading images folder ❌'.red, err);
			return res.status(500).send('Failed to retrieve images.');
		}

		// Filter only image files
		const images = files.filter((file) => {
			const ext = path.extname(file).toLowerCase();
			return ext === '.png' || ext === '.jpg' || ext === '.jpeg';
		});

		// Map to full URLs
		const baseUrl = `${req.protocol}://${req.get('host')}/uploads/images/`;
		const imageUrls = images.map((file) => baseUrl + file);

		res.status(200).json({
			count: imageUrls.length,
			images: imageUrls,
		});
	});
};

// @desc    Post an image to the filesystem
// @route   POST /api/image
// @access  Public
const postImage = (req, res) => {
	if (!req.file) {
		console.log('No image uploaded ❌'.yellow.bold);
		return res.status(400).send('No image uploaded.');
	}

	// Extract extension from original file
	const ext = path.extname(req.file.originalname).toLowerCase();

	if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
		console.log('Invalid file type ❌'.red.bold);

		// Delete the uploaded file since it's not allowed
		fs.unlink(req.file.path, (err) => {
			if (err) {
				console.error('Error deleting file:'.red, err);
			} else {
				console.log(`Deleted invalid file: ${req.file.filename} 🗑️`.gray);
			}
		});

		return res.status(400).send('Only .png, .jpg, .jpeg images are allowed.');
	}

	console.log(`File uploaded! ✅`.green.bold);
	console.log(`Original Name: ${req.file.originalname}`.cyan);
	console.log(`Saved As: ${req.file.filename}`.yellow);
	console.log(`Size: ${req.file.size} bytes`.magenta);

	res.send('Image uploaded successfully');
};

module.exports = {
	getImages,
	postImage,
};
