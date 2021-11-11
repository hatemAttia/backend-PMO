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
  },

  { timestamps: true }
);

const NewsModel = mongoose.model("news", newsSchema);

module.exports = NewsModel;
