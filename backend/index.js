const dotenv = require('dotenv').config();
const express = require('express');
const colors = require('colors');
const path = require('path');

const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve uploads folder statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/image', require('./routes/image'));

app.listen(port, () => {
	console.log(`Server is running on port: ${port}`.brightCyan.bold);
});
