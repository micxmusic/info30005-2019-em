const mongoose = require('mongoose');

const Comments = mongoose.model('comments');

const showDropComments = (req, res) => {
  const dropID = req.params.id;
  Comments.findById(dropID, (err, drop) => {
    if (!err) {
      res.send(drop);
    } else {
      res.sendStatus(404);
    }
  });
};

const addDropComment = (req, res) => {
  const newComment = new Comments({
    user_id: req.body.user_id,
    drop_id: req.body.drop_id,
    content: req.body.content,
    pinned: false,
    timeOfPost: new Date(),
  });

  if (req.body.inReplyTo) {
    newComment.inReplyTo = req.body.inReplyTo;
  }

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
