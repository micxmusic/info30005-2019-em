const mongoose = require('mongoose');

const participation = mongoose.Schema({
  drop_id: String,
  user_id: String,
  type: String,
});

mongoose.model('participation', participation);
