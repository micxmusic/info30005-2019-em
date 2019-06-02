const mongoose = require('mongoose');

const dropSchema = mongoose
  .Schema({
    name: String,
    price: Number,
    purchaseDate: Date,
    creator: String,
    description: String,
    image: String,
    participants: [mongoose.Schema.ObjectId],
  })
  .set('toJSON', {
    virtuals: true,
  });

mongoose.model('drops', dropSchema);
