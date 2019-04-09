var mongoose = require('mongoose');
var dropSchema = mongoose.Schema(
    {
        "name":String,
        "price":String,
        "purchaseDate":String,
        "creator":String,
        "description":String
    }
);
mongoose.model('Drops',dropSchema);
module.exports = dropSchema;
