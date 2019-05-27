const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const Comment = mongoose.model('comments');

const showDropComments = async (req, res) => {
  try {
    res.send(
      await Comment.find({ dropId: req.params.dropId }).sort({
        timeOfPost: 'desc',
      })
    );
  } catch (err) {
    res.sendStatus(403);
  }
};

const addDropComment = async (req, res) => {
  const userToken = jwt.verify(req.headers.authorization.split(' ')[1], process.env.SECRET);
  const newComment = new Comment({
    userId: mongoose.Types.ObjectId(userToken.id),
    name: userToken.name,
    dropId: mongoose.Types.ObjectId(req.body.dropId),
    content: req.body.content,
    inReplyTo: mongoose.Types.ObjectId(req.body.inReplyTo),
  });
  try {
    await newComment.save();
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(500);
  }
};

module.exports.showDropComments = showDropComments;
module.exports.addDropComment = addDropComment;
