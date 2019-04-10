const express = require('express');
const bodyParser = require('body-parser');

require('./models/db.js');
const routes = require('./routes/routes.js');



const app = express();
app.use('/', routes);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.listen(3000, console.log('Listening on port 3000'));