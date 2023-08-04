const express = require('express');
const app = express();

const errorHandler = (err, req, res, next) => {
  const statuscode = err.statuscode ? err.statuscode : 500;
  const data = { message: 'An error occurred.' };
  res.status(statuscode).json(data);
};

module.exports = errorHandler;
