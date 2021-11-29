const newsModel = require("../models/news");
const mongoose = require('mongoose');


exports.createNews = async(req, res, next) => {
    let story = new newsModel({
        title: req.body.title,
        description: req.body.description,
        adress: req.body.adress,
        date: req.body.date,
        image: 'team.png',
        isactive:req.body.isactive,
        url:req.body.url,
    });

    await story.save((err) => {
        if (err) {
            res.json({ success: false, message: err })

        } else {
            res.json({ success: true, story })
        }
    })
};

exports.getAllstories = async(req, res, next) => {
    await newsModel.find()
        .then(objet => res.status(200).json(objet))
        .catch(err => res.status(400).json("Error getting objet"))
}

exports.deleteStory = async(req, res) => {
    const story = await newsModel.findById(req.params.id)
    console.log(req.param.id);

    if (story) {
        await story.remove()
        res.json({ message: 'story removed' })
    } else {
        res.status(404)
        throw new Error('story. not found')
    }
}

exports.updateStory = async(req, res) => {
    console.log(req.params.id);
    console.log("hello");

    const story = await newsModel.findById(req.params.id)
    if (story) {
        story.title = req.body.title || story.title
        story.description = req.body.description || story.description
        story.adress = req.body.adress || story.adress
        story.date = req.body.date || story.date
        story.image = req.body.image || story.image
        story.isactive = req.body.isactive 
        story.url = req.body.url || story.url
       
        const updatedStory = await story.save()

        res.json(updatedStory)


    } else {
        res.status(404)
        throw new Error('User not found')
    }
}

exports.updateImage = async(req, res) => {
    console.log(req.file.filename);
    console.log("hello");

    const story = await newsModel.findById(req.params.id)
    if (story) {

        story.image = req.file.filename || story.image


        const updatedimage = await story.save()

        res.json(updatedimage)


    } else {
        res.status(404)
        throw new Error('User not found')
    }
}

exports.newsCount = async(req, res, next) => {
    const newsCount=await newsModel.countDocuments((count)=>count)
    if(!newsCount){
        res.status(400).json("Error getting objet")
    }
     res.status(200).json({"count":newsCount})
  }