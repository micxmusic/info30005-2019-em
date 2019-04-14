const mongoose = require('mongoose');

const dropSchema = mongoose.Schema({
  name: String,
  price: String,
  purchaseDate: String,
  creator: String,
  description: String,
});

mongoose.model('drops', dropSchema);
