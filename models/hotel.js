import mongoose from "mongoose";
const Schema = mongoose.Schema;

const hotelSchema = new Schema(
  {
    name: {
      type: String,
    },
    nb_chambre: {
      type: Number,
    },

    type: {
      type: String,
    },
    prix: {
      type: Number,
    },
    image: {
      type: String,
    },
    vues: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
  },

  { timestamps: true }
);

const HotelModel = mongoose.model("hotel", hotelSchema);

module.exports = HotelModel;
