const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const aws = require('aws-sdk');
const uuidv4 = require('uuid/v4');

const { S3_BUCKET } = process.env;

aws.config.update({
  region: 'ap-southeast-2',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const Drop = mongoose.model('drops');

const signUploadReq = (req, res) => {
  const s3 = new aws.S3();
  const { fileType } = req.body;
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: uuidv4(),
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read',
  };
  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if (err) {
      console.log(err);
      return res.sendStatus(400);
    }
    return res.json({
      signedUrl: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${s3Params.Key}`,
    });
  });
};

const createDrop = (req, res) => {
  const userToken = jwt.verify(req.headers.authorization.split(' ')[1], process.env.SECRET);
  const drop = new Drop({
    name: req.body.name,
    price: req.body.price,
    purchaseDate: req.body.purchaseDate,
    creator: userToken.name,
    description: req.body.description,
    image: req.body.image,
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
  Drop.find()
    .sort({ date: -1 })
    .limit(4)
    .exec((err, drops) => {
      if (!err) {
        res.send(drops);
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

module.exports.signUploadReq = signUploadReq;
module.exports.createDrop = createDrop;
module.exports.findAllDrops = findAllDrops;
module.exports.findDrop = findDrop;
module.exports.findDropByName = findDropByName;
module.exports.pullLastDrop = pullLastDrop;
