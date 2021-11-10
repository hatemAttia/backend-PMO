import mongoose from "mongoose";
const Schema = mongoose.Schema;

const histoMailSchema = new Schema(
  {
    subject: {
        type: String,
    },
    message: {
        type: String,
    },
  },

  { timestamps: true }
);

const histMailModel = mongoose.model("histoMail", histoMailSchema);

module.exports = histMailModel;
