const mongoose = require('mongoose');

mongoose.connect(
  'mongodb+srv://experiments:Sjp4YOyb74eH1ZFN@info30005-tutorials-s0j6n.mongodb.net/experiments?retryWrites=true',
  err => {
    if (!err) {
      console.log('Connected to mongo');
    } else {
      console.log(err);
      console.log('Failed to connect to mongo');
    }
  }
);

require('require-dir')(__dirname);
