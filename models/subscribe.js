import mongoose from "mongoose"

const Schema = mongoose.Schema;

const subscribeSchema = new Schema(
    {
        email : { type:String,
        required : true
        }    
    
    
    },
    { timestamps: true }
);

const SubscribeModel = mongoose.model("subscribe", subscribeSchema);

module.exports = SubscribeModel;
