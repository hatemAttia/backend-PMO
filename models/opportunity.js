import mongoose from "mongoose";
const Schema = mongoose.Schema;

const opportunitySchema = new Schema(
  {
    image: {
      type: String,
    },
    description: {
      type: String,
    },
    title: {
      type: String,
    },
    url: {
      type: String,
    },
    isactive: {
      type: Boolean,
    },
  },

  { timestamps: true }
);

const OpportunityModel = mongoose.model("opportunity", opportunitySchema);

module.exports = OpportunityModel;
