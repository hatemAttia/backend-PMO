const fileModel = require("../models/file");
const mongoose = require("mongoose");

exports.createFile = async (req, res, next) => {
  let file = new fileModel({
    title: req.body.title,
    description: req.body.description,
    fileName: req.body.fileName,
    //  vues: mongoose.Types.ObjectId(req.body.category),
  });

  await file.save((err) => {
    if (err) {
      res.json({ success: false, message: err });
    } else {
      res.json({ success: true, file });
    }
  });
};

exports.updateFileName = async (req, res) => {
  console.log(req.file.filename);
  console.log("hello");

  const file = await fileModel.findById(req.params.id);
  if (file) {
    file.fileName = req.file.filename || file.fileName;

    const updatedimage = await file.save();

    res.json(updatedimage);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
};
exports.getAllFiles = async (req, res, next) => {
  await fileModel
    .find()
    // .populate('category')
    .then((objet) => res.status(200).json(objet))
    .catch((err) => res.status(400).json("Error getting objet"));
};

exports.deleteFile = async (req, res) => {
  const file = await fileModel.findById(req.params.id);
  console.log(req.param.id);

  if (file) {
    await file.remove();
    res.json({ message: "file removed" });
  } else {
    res.status(404);
    throw new Error("file. not found");
  }
};

exports.updateFile = async (req, res) => {
  console.log(req.params.id);
  console.log("hello");

  const file = await fileModel.findById(req.params.id);
  if (file) {
    file.title = req.body.title || file.title;
    file.fileName = req.body.fileName || file.fileName;
    file.description = req.body.description || file.description;

    const updatedFile = await file.save();

    res.json(updatedFile);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
};
