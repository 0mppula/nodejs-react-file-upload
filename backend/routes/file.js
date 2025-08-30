const express = require('express');
const router = express.Router();

const { getFiles, postFile } = require('../controllers/file');

router.route('/').get(getFiles).post(postFile);

module.exports = router;
