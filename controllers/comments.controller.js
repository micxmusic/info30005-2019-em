const mongoose = require('mongoose');

const Comments = mongoose.model('comments');

const showDropComments = async (req, res) => {
  try {
    const comments = await Comments.find({ dropId: req.params.dropId }).sort({
      timeOfPost: 'desc',
    });
    res.send(comments);
  } catch (err) {
    res.sendStatus(403);
  }
};

const addDropComment = async (req, res) => {
  const newComment = new Comments({
    userId: mongoose.Types.ObjectId(req.body.userId),
    name: req.body.name,
    dropId: mongoose.Types.ObjectId(req.body.dropId),
    content: req.body.content,
    inReplyTo: mongoose.Types.ObjectId(req.body.inReplyTo),
  });
  try {
    await newComment.save();
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(400);
  }
};

module.exports.showDropComments = showDropComments;
module.exports.addDropComment = addDropComment;
