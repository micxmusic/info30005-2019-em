const mongoose = require('mongoose');
const commentSchema = mongoose.Schema(
    {
        "User": String,  
        "Content": String,
        "Pinned": Boolean,
        "timeOfPost": Date,
        // "inReplyTo" : commentSchema
    }
);
mongoose.model('comments',commentSchema);
