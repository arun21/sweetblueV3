const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const appRoutes = require('./server/app-router');
const dbConnection = require('./server/db-connection');


const app = express();
app.use(bodyParser.json());

// Database connection
dbConnection.connect();

//CORS Middleware
app.use(cors());

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Initialize API routes
app.use('/api', appRoutes);

//Index route
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'public/index.html'));
});

const port = process.env.PORT || 8080;

//Start Server
app.listen(port, () => {
	console.log('Server running on ' + port);
});

// Init migrations
require('./server/migrations');