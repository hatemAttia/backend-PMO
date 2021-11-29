var nodemailer = require('nodemailer');
const asyncHandler = require('express-async-handler');
const teamModel = require("../models/team");
const histoMailModel = require("../models/histoMail");
require('dotenv').config();

exports.sendMail = asyncHandler(async(req, res) => {

    const {

        email,
        subject,
        message,
        name
    } = req.body
    console.log(req.body)

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.Mail ,
            pass: process.env.Mp_Mail
        }
    });

    var mailOptions = {
        from: email,
        to: process.env.Mail,
        subject: "email from " + email + " name " + name + " about " + subject,
        text: message
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    res.status(200).json('message envoyé')

})


exports.sendMultiMail = asyncHandler(async(req, res) => {

     const {
         subject,
         message,
        
     } = req.body

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.Mail ,
            pass: process.env.Mp_Mail
        }
    });

    let histoMail = new histoMailModel({
        subject:subject,
        message: message,    
    });

    await histoMail.save((err) => {
        if (err) {
           console.log(err);

        } else {
           console.log(histoMail);

        }
    })

    const membreMail =await teamModel.find()
    .select("email")
    membreMail.forEach(element => {
        var mailOptions = {
            from: process.env.Mail,
            to: element.email,
            subject:subject,
            text: message
        };
    
        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        
    });
   
    res.status(200).json(membreMail)

})