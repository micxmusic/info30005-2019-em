const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
  user: String,
  content: String,
  pinned: Boolean,
  timeOfPost: Date,
  // "inReplyTo" : commentSchema
});
mongoose.model('comments', commentSchema);
