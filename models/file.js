import mongoose from "mongoose";
const Schema = mongoose.Schema;

const fileSchema = new Schema(
  {
    fileName: {
      type: String,
    },
    description: {
        type: String,
      },
      title: {
        type: String,
      
      }
  },

  { timestamps: true }
);

const FileModel = mongoose.model("file", fileSchema);

module.exports = FileModel;
