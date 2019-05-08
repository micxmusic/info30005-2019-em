const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const accountSchema = mongoose.Schema({
  username: String,
  email: String,
  name: String,
  password: String,
});

accountSchema.plugin(passportLocalMongoose, { usernameQueryFields: ['email'] });

module.exports = mongoose.model('account', accountSchema);
