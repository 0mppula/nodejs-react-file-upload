const dotenv = require('dotenv').config();
const express = require('express');
const colors = require('colors');

const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/file', require('./routes/file'));

app.listen(port, () => {
	console.log(`Server is running on port: ${port}`.brightCyan.bold);
});
