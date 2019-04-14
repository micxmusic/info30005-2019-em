const mongoose = require('mongoose');

const dropSchema = mongoose.Schema({
  name: String,
  price: Number,
  purchaseDate: Date,
  creator: String,
  description: String,
});

mongoose.model('drops', dropSchema);
