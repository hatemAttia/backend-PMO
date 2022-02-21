const subscribeModel = require("../models/subscribe");
const mongoose = require('mongoose');

exports.createSubscribe = async(req, res, next) => {
    const existSubsribe= await subscribeModel.findOne({email:req.body.email})
    if(existSubsribe){
        res.json({ success: false, "message":"alredy exist" })
    }else {
        let subscribe = new subscribeModel({
            email: req.body.email,
        });
        await subscribe.save((err) => {
            if (err) {
                res.json({ success: false, message: err })

            } else {
                res.json({ success: true, subscribe })
            }
        })
    }
};

exports.getAllSubscribes = async(req, res, next) => {
    await subscribeModel.find()
        .then(objet => res.status(200).json(objet))
        .catch(err => res.status(400).json("Error getting objet"))
}

exports.subscribeCount = async(req, res, next) => {
    const subscribeCount=await subscribeModel.countDocuments((count)=>count)
    if(!subscribeCount){
        res.status(400).json("Error getting objet")
    }
     res.status(200).json({"count":subscribeCount})
  }