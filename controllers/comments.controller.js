const mongoose = require('mongoose');

const Comments = mongoose.model('comments');

const showDropComments = (req, res) => {
  Comments.find({ dropId: req.params.dropId }, (err, drop) => {
    if (!err) {
      res.send(drop);
    } else {
      res.sendStatus(404);
    }
  });
};

const addDropComment = (req, res) => {
  const newComment = new Comments({
    userId: mongoose.Types.ObjectId(req.body.userId),
    dropId: mongoose.Types.ObjectId(req.body.dropId),
    content: req.body.content,
    inReplyTo: mongoose.Types.ObjectId(req.body.inReplyTo),
  });

  newComment.save((err, comment) => {
    if (!err) {
      res.send(comment);
    } else {
      res.sendStatus(400);
    }
  });
};

module.exports.showDropComments = showDropComments;
module.exports.addDropComment = addDropComment;
