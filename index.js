const express = require('express');
const dbConnect = require('./config/dbConnect');
const app = express();
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 7000;

app.get('/', (req, res) => {
  res.send('Hello from server side...');
});

app.listen(PORT, () => {
  console.log(`Server is Running at PORT ${PORT}`);
});

dbConnect();

// Move the dbConnect function into the same file
