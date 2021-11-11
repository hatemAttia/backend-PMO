const histoMailModel = require("../models/histoMail");
const mongoose = require('mongoose');


exports.createhistoMail = async(req, res, next) => {
    let histoMail = new histoMailModel({
        subject: req.body.subject,
        message: req.body.message,
        
      
    });

    await histoMail.save((err) => {
        if (err) {
            res.json({ success: false, message: err })

        } else {
            res.json({ success: true, histoMail })
        }
    })
};

exports.getAllmails = async(req, res, next) => {
    await histoMailModel.find()
        .then(objet => res.status(200).json(objet))
        .catch(err => res.status(400).json("Error getting objet"))
}

exports.deletemail = async(req, res) => {
    const mail = await histoMailModel.findById(req.params.id)
    console.log(req.param.id);

    if (mail) {
        await mail.remove()
        res.json({ message: 'mail removed' })
    } else {
        res.status(404)
        throw new Error('mail. not found')
    }
}

exports.updatemail = async(req, res) => {
    console.log(req.params.id);
    console.log("hello");

    const mail = await histoMailModel.findById(req.params.id)
    if (mail) {
        mail.subject= req.body.subject || mail.subject
        mail.message= req.body.message || mail.message
        
       
        const updatedmail = await mail.save()

        res.json(updatedmail)


    } else {
        res.status(404)
        throw new Error('User not found')
    }
}

