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
      res.sendStatus(400);
    }
    res.json({
      signedUrl: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${s3Params.Key}`,
    });
  });
};

const createDrop = async (req, res) => {
  const userToken = jwt.verify(req.headers.authorization.split(' ')[1], process.env.SECRET);
  const drop = new Drop({
    name: req.body.name,
    price: req.body.price,
    purchaseDate: req.body.purchaseDate,
    creator: userToken.name,
    description: req.body.description,
    image: req.body.image,
  });

  try {
    res.send({ id: await drop.save().id });
  } catch {
    res.sendStatus(400);
  }
};

const findAllDrops = async (req, res) => {
  try {
    res.send(await Drop.find());
  } catch {
    res.sendStatus(404);
  }
};

const findDrop = async (req, res) => {
  try {
    const drop = await Drop.findById(req.params.id);
    if (drop) {
      res.send(drop);
    } else {
      res.sendStatus(404);
    }
  } catch {
    res.sendStatus(500);
  }
};

const pullLastDrop = async (req, res) => {
  try {
    res.send(
      await Drop.find()
        .sort({ date: -1 })
        .limit(4)
    );
  } catch {
    res.sendStatus(404);
  }
};

const findDropByName = async (req, res) => {
  try {
    res.send(await Drop.find({ name: req.params.name }));
  } catch {
    res.sendStatus(500);
  }
};

module.exports.signUploadReq = signUploadReq;
module.exports.createDrop = createDrop;
module.exports.findAllDrops = findAllDrops;
module.exports.findDrop = findDrop;
module.exports.findDropByName = findDropByName;
module.exports.pullLastDrop = pullLastDrop;
