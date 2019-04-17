const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true }, err => {
  if (!err) {
    console.log('Connected to mongo');
  } else {
    throw new Error(`${err}\nFailed to connect to mongo`);
  }
});

require('require-dir')(__dirname);
