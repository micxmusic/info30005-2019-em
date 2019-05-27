const mongoose = require('mongoose');

const Participant = mongoose.model('participation');

const showUsersForDrop = (req, res) => {
  Participant.find({ dropId: req.params.dropId }, (err, participants) => {
    if (!err) {
      res.send(participants);
    } else {
      res.sendStatus(404);
    }
  });
};

const showDropsForUser = (req, res) => {
  Participant.find({ userId: req.params.userId }, (err, participants) => {
    if (!err) {
      res.send(participants);
    } else {
      res.sendStatus(404);
    }
  });
};

const joinDrop = async (req, res) => {
  const newDrop = new Participant({
    userId: mongoose.Types.ObjectId(req.body.userId),
    dropId: mongoose.Types.ObjectId(req.body.dropId),
    participationType: req.body.participationType,
  });
  try {
    await newDrop.save();
    res.sendStatus(200);
  } catch {
    res.sendStatus(406);
  }
};

module.exports.showUsersForDrop = showUsersForDrop;
module.exports.showDropsForUser = showDropsForUser;
module.exports.joinDrop = joinDrop;
