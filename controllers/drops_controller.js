const mongoose = require('mongoose');
const Drop = mongoose.model('Drops');

const createDrop = function(req,res){
    const drop = new Drop({
        name: req.body.name,
        price: req.body.price,
        purchaseDate: req.body.purchaseDate,
        creator: req.body.creator,
        description: req.body.description
    });
    drop.save(function(err,newDrop){
        if(!err){
            res.send(newDrop);
        }else{
            res.sendStatus(400);
        }
    });
};

const findAllDrops = function(req,res){
    Drop.find(function(err,drops){
        if(!err){
            res.send(drops);
        }else{
            res.sendStatus(404);
        }
    });
};

const findDrop = function(req,res){
    const dropID = req.params.id;
    Drop.findById(dropID,function(err,drop){
        if(!err){
            res.send(drop);
        }else{
            res.sendStatus(404);
        }
    });
};

const findDropByName = function(req, res){
    const dropName = req.params.name;
    Drop.find({name:dropName},function(err,drop){
        if(!err){
            res.send(drop);
        }else{
            res.sendStatus(404);
        }
    });
};

module.exports.createDrop = createDrop;
module.exports.findAllDrops = findAllDrops;
module.exports.findDrop = findDrop;
module.exports.findDropByName = findDropByName;