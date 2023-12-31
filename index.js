const express = require('express');
const path = require('path');
const logger = require('morgan');
const cors = require('cors')

// Always require and configure near the top 
require('dotenv').config();
// Connect to the database
require('./config/database');

// create the app
const app = express();

// comes from .env file or use 3001
const PORT = process.env.PORT || 3001

app.use(logger('dev'));
app.use(express.json());
app.use(cors())

// Configure both serve-favicon & static middleware
// to serve from the production 'build' folder
// telling our express app to use this directory for our static assets 
app.use(express.static(path.join(__dirname, 'build')));

app.use(require("./config/checkToken"))



// Put API routes here, before the "catch all" route
app.use('/api/users', require('./routes/api/users'))
app.use('/api/post', require('./routes/api/post'))
app.use('/api/comment', require('./routes/api/comment'))

app.listen(PORT, function() {
    console.log(`Express app running on port ${PORT}`)
  });