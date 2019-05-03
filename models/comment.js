const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  dropId: { type: mongoose.Schema.Types.ObjectId, required: true },
  content: { type: String, required: true },
  pinned: { type: Boolean, default: false },
  timeOfPost: { type: Date, default: Date.now },
  inReplyTo: { type: mongoose.Schema.Types.ObjectId },
});

mongoose.model('comments', commentSchema);
