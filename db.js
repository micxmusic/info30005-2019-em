// Create database
var mongoose = require('mongoose');

//mongodb://<dbuser>:<dbpassword>@ds259768.mlab.com:59768/eddy16042018
mongoose.connect('mongodb+srv://mgaunt:s1lv3rf1sh13s@drops-nztgj.mongodb.net/Drops?retryWrites=true',function(err){
    if(!err){
        console.log('Connected to mongo');
    }else{
        console.log('Failed to connect to mongo');
    }
});

require('C:/Users/meagh/info30005-2019-em/drops.js');
