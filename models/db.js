// Create database
const mongoose = require('mongoose');

//mongodb://<dbuser>:<dbpassword>@ds259768.mlab.com:59768/eddy16042018
mongoose.connect('mongodb+srv://glenda-s-l:nfapr87ap987pa@worksop-5-03ok4.mongodb.net/WebInfoTech?retryWrites=true',function(err){
    if(!err){
        console.log('Connected to mongo');
    }else{
        console.log('Failed to connect to mongo');
    }
});

require('./comment.js');
