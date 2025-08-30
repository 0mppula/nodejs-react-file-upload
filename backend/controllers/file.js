// @desc    Get files from the filesystem
// @route   GET /api/file
// @access  Public
const getFiles = (req, res) => {
	res.status(200).json({ plan: 'Hello World!' });
};

// @desc    Post a file to the filesystem
// @route   POST /api/file
// @access  Public
const postFile = (req, res) => {
	res.status(200).json({ plan: 'Hello World!' });
};

module.exports = {
	getFiles,
	postFile,
};
