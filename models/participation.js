const mongoose = require('mongoose');

const participation = mongoose.Schema({
  drop_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  participation_type: String,
});

mongoose.model('participation', participation);
