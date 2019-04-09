// Set up express
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());

// Database setup
require('C:/Users/meagh/info30005-2019-em/db.js');

// Routes setup
var routes = require('C:/Users/meagh/info30005-2019-em/routes.js');
app.use('/',routes);

// Start the server
app.listen(3000,function(req,res){
   console.log('Express listening on port 3000');
});