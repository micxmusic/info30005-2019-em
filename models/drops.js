const mongoose = require('mongoose');

const dropSchema = mongoose
  .Schema({
    name: String,
    price: Number,
    purchaseDate: Date,
    creator: String,
    creatorId: mongoose.Schema.ObjectId,
    description: String,
    image: String,
    participants: [mongoose.Schema.ObjectId],
  })
  .set('toJSON', {
    virtuals: true,
  });

// Adapted from https://stackoverflow.com/questions/44833817/mongodb-full-and-partial-text-search
dropSchema.index({ name: 'text', description: 'text' }, { weights: { name: 5, description: 3 } });

dropSchema.statics = {
  searchPartial(q, callback) {
    return this.find(
      {
        $or: [{ name: new RegExp(q, 'gi') }, { description: new RegExp(q, 'gi') }],
      },
      callback
    );
  },

  searchFull(q, callback) {
    return this.find(
      {
        $text: { $search: q, $caseSensitive: false },
      },
      callback
    );
  },

  search(q, callback) {
    this.searchFull(q, (err, data) => {
      if (err) return callback(err, data);
      if (!err && data.length) return callback(err, data);
      if (!err && data.length === 0) return this.searchPartial(q, callback);
    });
  },
};

mongoose.model('drops', dropSchema);
