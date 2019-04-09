const mongoose = require('mongoose');
const commentSchema = mongoose.Schema(
    {
        "User": String,  
        "Content": String,
        "Pinned": boolean,
        "timeOfPost": Date,
        // "inReplyTo" : commentSchema
    }
);
mongoose.model('comments',commentSchema);
