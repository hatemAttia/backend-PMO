import mongoose from "mongoose";
const Schema = mongoose.Schema;

const newsSchema = new Schema(
  {
    title: {
      type: String,
    },
    image: {
        type: String,
      },
    description: {
        type: String,
      },
      url: {
        type: String,
      },
      isactive: {
        type: Boolean,
      }
  },

  { timestamps: true }
);

const NewsModel = mongoose.model("news", newsSchema);

module.exports = NewsModel;
