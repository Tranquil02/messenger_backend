import mongoose, { Schema } from "mongoose";

const friendSchema=new Schema({
    friendId:{
        type:mongoose.Types.ObjectId
    },
    name:String,
    email:String,
    myId:{
        type:mongoose.Types.ObjectId
    }
})

export const friend=mongoose.model("friend",friendSchema);