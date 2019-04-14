const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
  user_id: String,
  drop_id: String,
  content: String,
  pinned: Boolean,
  timeOfPost: Date,
  inReplyTo: String,
});

mongoose.model('comments', commentSchema);
