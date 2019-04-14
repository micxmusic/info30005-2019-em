const mongoose = require('mongoose');

const Participant = mongoose.model('participation');

const showUsersForDrop = (req, res) => {
  Participant.find({ drop_id: req.params.drop_id }, (err, participants) => {
    if (!err) {
      res.send(participants);
    } else {
      res.sendStatus(404);
    }
  });
};

const showDropsForUser = (req, res) => {
  Participant.find({ user_id: req.params.user_id }, (err, participants) => {
    if (!err) {
      res.send(participants);
    } else {
      res.sendStatus(404);
    }
  });
};

const joinDrop = (req, res) => {
  const newDrop = new Participant({
    user_id: mongoose.Types.ObjectId(req.body.user_id),
    drop_id: mongoose.Types.ObjectId(req.body.drop_id),
    participation_type: req.body.participation_type,
  });
  newDrop.save((err, participants) => {
    if (!err) {
      res.send(participants);
    } else {
      res.sendStatus(400);
    }
  });
};

module.exports.showUsersForDrop = showUsersForDrop;
module.exports.showDropsForUser = showDropsForUser;
module.exports.joinDrop = joinDrop;
