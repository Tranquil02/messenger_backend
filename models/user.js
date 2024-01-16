import mongoose, { Schema } from "mongoose";

const userschema=new Schema({
    name:String,
    email:String,
    password:String,
    // profile:{
    //     type:Buffer
    // },
})

export const user=mongoose.model("users",userschema);