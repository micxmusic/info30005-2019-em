const mongoose = require('mongoose');

const Comments = mongoose.model('comments');

const showDropComments = (req, res) => {
  Comments.find({ drop_id: req.params.drop_id }, (err, drop) => {
    if (!err) {
      res.send(drop);
    } else {
      res.sendStatus(404);
    }
  });
};

const addDropComment = (req, res) => {
  const newComment = new Comments({
    user_id: mongoose.Types.ObjectId(req.body.user_id),
    drop_id: mongoose.Types.ObjectId(req.body.drop_id),
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
