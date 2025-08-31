const dotenv = require('dotenv').config();
const express = require('express');
const colors = require('colors');
const path = require('path');
const cors = require('cors');

const port = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve images
app.use('/uploads/images', express.static(path.join(__dirname, 'uploads/images')));

// Serve videos
app.use('/uploads/videos', express.static(path.join(__dirname, 'uploads/videos')));

app.use('/api/image', require('./routes/image'));
app.use('/api/video', require('./routes/video'));

app.listen(port, () => {
	console.log(`Server is running on port: ${port}`.brightCyan.bold);
});
