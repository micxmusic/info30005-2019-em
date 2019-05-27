/* eslint-disable no-console */
const mongoose = require('mongoose');

const connectDb = async () => mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });

mongoose.connection.on('connected', () => {
  console.log('DB Connected');
});

mongoose.connection.on('reconnected', () => {
  console.log('DB Reconnected');
});

mongoose.connection.on('disconnected', () => {
  console.log('DB Disconnected');
});

mongoose.connection.on('close', () => {
  console.log('DB Connection Closed');
});

mongoose.connection.on('error', err => {
  console.error(err);
});

require('require-dir')(__dirname);

module.exports.connectDb = connectDb;
