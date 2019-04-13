const mongoose = require('mongoose');

mongoose.connect(
  'mongodb+srv://glenda-s-l:nfapr87ap987pa@worksop-5-03ok4.mongodb.net/WebInfoTech?retryWrites=true',
  err => {
    if (!err) {
      console.log('Connected to mongo');
    } else {
      console.log('Failed to connect to mongo');
    }
  }
);

require('./comment.js');

/*
Meaghan's database details
'mongodb+srv://mgaunt:s1lv3rf1sh13s@drops-nztgj.mongodb.net/Drops?retryWrites=true'*/