const mongoose = require('mongoose');
const Comments = mongoose.model('comments');

const showDropComments= function(req,res){
    const dropID = req.params.id;
    Comments.findById(dropID, function(err, drop){
        if(!err){
            res.send(drop);
        }else{
            res.sendStatus(404);
        }
    });
};
// create a new comment object and put into into mongo, refer to michelle's participant_controller
const addDropComments = function(req,res){
    const newComment = new Comment({
        User: req.body.username,
        Content: req.body.comment,
        Pinned: false,
        timeOfPost: new Date()
    });
    newComment.save((err, comment) => {
        if (!err) {
            res.send(comment);
          } else {
            res.sendStatus(400);
          }
    });
};

module.exports.showDropComments = showDropComments;
module.exports.addDropComments = addDropComments;
