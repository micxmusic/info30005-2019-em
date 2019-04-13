const express = require('express');

const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('./models/db.js');

const routes = require('./routes/routes.js');

app.use('/', routes);

app.listen(3000, console.log('Listening on port 3000'));
