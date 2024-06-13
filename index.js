// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const bodyparser = require('body-parser');
const connectDB = require('./config/db');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const { logger } = require('./middlewares/logEvents');
const { errorHandler } = require('./middlewares/errorHandler');

// Determine the environment
const env = process.env.NODE_ENV || 'development';
console.log(env);

// Import versioned routes
const v1Routes = require('./routes/v1Routes');
const v2Routes = require('./routes/v2Routes');

const port = process.env.PORT || 3001;

const app = express()

app.use(logger)
app.use(bodyparser.urlencoded({ extended: true }))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static(path.join(__dirname, './public')))

// Connect to MongoDB
connectDB();

// Use versioned routes
app.use('/api/v1', v1Routes);
app.use('/api/v2', v2Routes);

app.listen(port, () => {
    console.log(`App Running on port ${port}`)
})

app.all('*', (req, res) => {
    res.status(404);
    res.json({ "error": "404 Not Found" })
})

app.use(errorHandler)
