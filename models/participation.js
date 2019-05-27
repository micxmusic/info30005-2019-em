const mongoose = require('mongoose');

const participation = mongoose
  .Schema({
    dropId: { type: mongoose.Schema.Types.ObjectId, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    participationType: String,
  })
  .set('toJSON', {
    virtuals: true,
  });

mongoose.model('participation', participation);
