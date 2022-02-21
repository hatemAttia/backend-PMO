const teamModel = require("../models/team");
const mongoose = require('mongoose');


exports.createTeam = async(req, res, next) => {
    let team = new teamModel({
        fullName: req.body.fullName,
        email: req.body.email,
        description: req.body.description,
        image: 'team.png',
        facebook: req.body.facebook,
        instagram: req.body.instagram,
        twitter: req.body.twitter,
        job:req.body.job,
        linkedin:req.body.linkedin,
      
    });

    await team.save((err) => {
        if (err) {
            res.json({ success: false, message: err })

        } else {
            res.json({ success: true, team })
        }
    })
};

exports.getAllMembres = async(req, res, next) => {
    await teamModel.find()
        .then(objet => res.status(200).json(objet))
        .catch(err => res.status(400).json("Error getting objet"))
}

exports.deleteMembre = async(req, res) => {
    const membre = await teamModel.findById(req.params.id)
    console.log(req.param.id);

    if (membre) {
        await membre.remove()
        res.json({ message: 'membre removed' })
    } else {
        res.status(404)
        throw new Error('membre. not found')
    }
}

exports.updateMembre = async(req, res) => {
    console.log(req.params.id);
    console.log("hello");

    const membre = await teamModel.findById(req.params.id)
    if (membre) {
        membre.fullName = req.body.fullName || membre.fullName
        membre.email = req.body.email || membre.email
        membre.description = req.body.description || membre.description
        membre.facebook = req.body.facebook || membre.facebook
        membre.instagram = req.body.rate || membre.instagram
        membre.linkedin = req.body.linkedin || membre.linkedin
        membre.job = req.body.job || membre.job
        membre.twitter = req.body.twitter || membre.twitter
        membre.image = req.body.image || membre.image
       
        const updatedMembre = await membre.save()

        res.json(updatedMembre)


    } else {
        res.status(404)
        throw new Error('User not found')
    }
}

exports.updateImage = async(req, res) => {
    console.log(req.file.filename);
    console.log("hello");
    console.log(req.params.id);

    const membre = await teamModel.findById(req.params.id)
    if (membre) {

        membre.image = req.file.filename || membre.image


        const updatedimage = await membre.save()

        res.json(updatedimage)


    } else {
        res.status(404)
        throw new Error('User not found')
    }
}

exports.teamCount = async(req, res, next) => {
    const membreCount=await teamModel.countDocuments((count)=>count)
    if(!membreCount){
        res.status(400).json("Error getting objet")
    }
     res.status(200).json({"count":membreCount})
}
