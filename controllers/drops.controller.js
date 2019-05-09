const mongoose = require('mongoose');

const Drop = mongoose.model('drops');

const createDrop = (req, res) => {
  const drop = new Drop({
    name: req.body.name,
    price: req.body.price,
    purchaseDate: req.body.purchaseDate,
    creator: req.body.creator,
    description: req.body.description,
  });
  drop.save((err, newDrop) => {
    if (!err) {
      res.send(newDrop);
    } else {
      res.sendStatus(400);
    }
  });
};

const findAllDrops = (req, res) => {
  Drop.find((err, drop) => {
    if (!err) {
      res.send(drop);
    } else {
      res.sendStatus(404);
    }
  });
};

const findDrop = (req, res) => {
  Drop.findById(req.params.id, (err, drop) => {
    if (!err) {
      res.send(drop);
    } else {
      res.sendStatus(404);
    }
  });
};

const pullLastDrop = (req, res) => {
  Drop.findOne()
    .sort({ date: -1 })
    .limit(1)
    .exec((err, drop) => {
      if (!err) {
        res.send(drop);
      } else {
        res.sendStatus(404);
      }
    });
};

const findDropByName = (req, res) => {
  Drop.find({ name: req.params.name }, (err, drop) => {
    if (!err) {
      res.send(drop);
    } else {
      res.sendStatus(404);
    }
  });
};

module.exports.createDrop = createDrop;
module.exports.findAllDrops = findAllDrops;
module.exports.findDrop = findDrop;
module.exports.findDropByName = findDropByName;
module.exports.pullLastDrop = pullLastDrop;
