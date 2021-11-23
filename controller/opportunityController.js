const opportunityModel = require("../models/opportunity");
const mongoose = require('mongoose');


exports.createOpportunity = async(req, res, next) => {
    let opportunity = new opportunityModel({
        title: req.body.title,
        description: req.body.description,
        image: 'team.png',
        isactive:req.body.isactive,
        url:req.body.url,
    });

    await opportunity.save((err) => {
        if (err) {
            res.json({ success: false, message: err })

        } else {
            res.json({ success: true, opportunity })
        }
    })
};

exports.getAllOpportunities = async(req, res, next) => {
    await opportunityModel.find()
        .then(objet => res.status(200).json(objet))
        .catch(err => res.status(400).json("Error getting objet"))
}

exports.deleteOpportunity = async(req, res) => {
    const opportunity = await opportunityModel.findById(req.params.id)
    console.log(req.param.id);

    if (opportunity) {
        await opportunity.remove()
        res.json({ message: 'opportunity removed' })
    } else {
        res.status(404)
        throw new Error('opportunity. not found')
    }
}

exports.updateOpportunity = async(req, res) => {
    console.log(req.params.id);
    console.log("hello");

    const opportunity = await opportunityModel.findById(req.params.id)
    if (opportunity) {
        opportunity.title = req.body.fullName || opportunity.title
        opportunity.description = req.body.description || opportunity.description
        opportunity.image = req.body.image || opportunity.image
        opportunity.isactive = req.body.isactive || membre.isactive
        opportunity.url = req.body.url || membre.url
        const updatedOpportunity = await opportunity.save()

        res.json(updatedOpportunity)


    } else {
        res.status(404)
        throw new Error('User not found')
    }
}

exports.updateImage = async(req, res) => {
    console.log(req.file.filename);
    console.log("hello");

    const opportunity = await opportunityModel.findById(req.params.id)
    if (opportunity) {

        opportunity.image = req.file.filename || opportunity.image


        const updatedimage = await opportunity.save()

        res.json(updatedimage)


    } else {
        res.status(404)
        throw new Error('User not found')
    }
}

exports.opportunityCount = async(req, res, next) => {
    const opportunityCount=await opportunityModel.countDocuments((count)=>count)
    if(!opportunityCount){
        res.status(400).json("Error getting objet")
    }
     res.status(200).json({"count":opportunityCount})
  }