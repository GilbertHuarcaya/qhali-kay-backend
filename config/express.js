const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

function connectDB(app) {
  app.use(cors());
  app.use(morgan('dev'));
  app.use(express.json());
}

module.exports = connectDB;
