const mongoose = require('mongoose');

const participantSchema = mongoose.Schema({
  drop_id: String,
  user_id: String,
  type: String,
});
mongoose.model('participants', participantSchema);
