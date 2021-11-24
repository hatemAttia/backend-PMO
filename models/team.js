import mongoose from "mongoose";
const Schema = mongoose.Schema;

const teamSchema = new Schema(
  {
    fullName: {
      type: String,
      required:true
    },
    email: {
      type: String,
     // required:true
    },
    facebook: {
      type: String,
    },
    image: {
        type: String,
      },
    instagram: {
        type: String,
      },
    twitter: {
      type: String,
    },
    description: {
        type: String,
      },
    job: {
        type: String,
      },
    linkedin: {
        type: String,
      },
  },

  { timestamps: true }
);

const TeamModel = mongoose.model("team", teamSchema);

module.exports = TeamModel;
