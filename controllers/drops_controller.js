var mongoose = require('mongoose');
var Drop = mongoose.model('Drops');

var createDrop = function(req,res){
    var drop = new Drop({
        "name":req.body.name,
        "price":req.body.price,
        "purchaseDate":req.body.purchaseDate,
        "creator":req.body.creator,
        "description":req.body.description
    });
    drop.save(function(err,newDrop){
        if(!err){
            res.send(newDrop);
        }else{
            res.sendStatus(400);
        }
    });
};

var findAllDrops = function(req,res){
    drops.find(function(err,Drop){
        if(!err){
            res.send(drops);
        }else{
            res.sendStatus(404);
        }
    });
};

var findDrop = function(req,res){
    var cafeInx = req.params.id;
    drops.findById(cafeInx,function(err,Drop){
        if(!err){
            res.send(Drop);
        }else{
            res.sendStatus(404);
        }
    });
};

var findDropByName = function(req, res){
    var dropName = req.params.name;
    Drop.find({name:dropName},function(err,Drop){
        if(!err){
            res.send(dropName);
        }else{
            res.sendStatus(404);
        }
    });
};

module.exports.createDrop = createDrop;
module.exports.findAllDrops = findAllDrops;
module.exports.findDrop = findDrop;
module.exports.findDropByName = findDropByName;