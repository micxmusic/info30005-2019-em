const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const accountSchema = mongoose.Schema({
  username: String,
  name: { type: String, required: true },
});

accountSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('account', accountSchema);
