'use strict';

// load modules
const express = require('express');
const morgan = require('morgan');
const Sequelize = require('sequelize');
const {development} = require('./config/config.json');
const asyncHandler = require('./middleware/asyncHandler');

// variable to enable global error logging
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';


// router imports
const user = require('./routes/api/user');
const course = require('./routes/api/course');

// create the Express app
const app = express();
//add a body property to the express request
app.use(express.json());

// setup morgan which gives us http request logging
app.use(morgan('dev'));

//connection to database
const sequelize = new Sequelize(development);
// test if connection is established
app.use( asyncHandler( async ( req, res, next) => {
  await sequelize.authenticate();
  await sequelize.sync({force: true});
  console.log('Connected to database');
  next();
    })
)
  

app.use('/api/users', user);
app.use('/api/courses', course);

// setup a friendly greeting for the root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the REST API project!',
  });
});

// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found',
  });
});

// setup a global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }

  res.status(err.status || 500).json({
    message: err.message,
    error: {},
  });
});

// set our port
app.set('port', process.env.PORT || 5000);

// start listening on our port
const server = app.listen(app.get('port'), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});
