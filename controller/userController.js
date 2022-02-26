const mongoose = require('mongoose');
const express = require('express');
const userModel = require('../models/user');
const bcrypt = require('bcryptjs');
//const joi = require('joi');

const jwt = require('jsonwebtoken');
const secret = 'test';
const _ = require('lodash');

//hedhi ili nadhreb aleha 
exports.login = async(req, res, next) => {

    let user = await userModel.findOne({ email: req.body.email });
    if (!user) { return res.status(400).json({ message: "Invalid Email or Password " }); }
    const checkPassword = await bcrypt.compare(req.body.password, user.password);
    if (!checkPassword) { return res.status(400).json({ message: "Invalid Email or Password " }); }

    const token = user.generateTokens()

    // await admin.save();
    res.status(200).json({ token: token, admin: { _id: user.id, email: user.email, role: user.role, image: user.image } });
}

exports.register = async(req, res, next) => {

    const olduser = await userModel.findOne({ email: req.body.email });
    if (olduser) { return res.status(400).json({ message: "Email already exists" }); }

    const user = new userModel(req.body);
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    user.role= req.body.role;

    await user.save();
    const token = user.generateTokens();
    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'email']));

}
exports.changerpwdsuper = async(req, res, next) => {

    const user = await userModel.findOne({ email: req.body.email });
    if (!user) { return res.status(400).json({ message: "Email doesn't exists" }); }
    const checkPassword = await bcrypt.compare(req.body.password, user.password);
    if (!checkPassword) { return res.status(400).json({ message: "Invalid Email or Password " }); }
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.Confirmepassword, salt);
    await user.save();
    const token = user.generateTokens();
    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'email']));
}

exports.changerpwdadmin = async(req, res, next) => {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) { return res.status(400).json({ message: "Email doesn't exists" }); }
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.Confirmepassword, salt);
    await user.save();
    const token = user.generateTokens();
    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'email']));
}

exports.updateAdmin = async(req, res) => {
    console.log(req.params.id);
    console.log("hello");
    const admin = await userModel.findById(req.params.id)
    if (admin) {
        admin.fullName = req.body.fullName || admin.fullName
        admin.email = req.body.email || admin.email
        admin.phonenumber = req.body.phonenumber || admin.phonenumber
        const updatedAdmin = await admin.save()
         res.json(updatedAdmin)
    } else {
        res.status(404)
        throw new Error('Admin not found')
    }
}

exports.deleteAdmin = async(req, res) => {
    const admin = await userModel.findById(req.params.id)
    console.log(req.param.id);

    if (admin) {
        await admin.remove()
        res.json({ message: 'admin removed' })
    } else {
        res.status(404)
        throw new Error('admin. not found')
    }
}
exports.getAllAdmins = async(req, res, next) => {
    await userModel.find()
        .then(objet => res.status(200).json(objet))
        .catch(err => res.status(400).json("Error getting objet"))
}

