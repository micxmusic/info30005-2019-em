const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/routes.js');

require('./models/db.js');

const app = express();
app.use('/', routes);
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(3000, console.log('Listening on port 3000'));
