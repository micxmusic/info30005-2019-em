const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  drop_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  content: String,
  pinned: { type: Boolean, default: false },
  timeOfPost: { type: Date, default: Date.now },
  inReplyTo: { type: mongoose.Schema.Types.ObjectId },
});

mongoose.model('comments', commentSchema);
