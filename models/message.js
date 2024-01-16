import mongoose, { Schema } from "mongoose";

const messsageschema = new Schema({
    text: {
        type: String,
        require: true
    },
    name: String,
    email: String,
    myid: {
        type: mongoose.Types.ObjectId,
        require: true
    },
    nextid: {
        type: mongoose.Types.ObjectId,
        require: true
    },
    time: {
        type: Date
    },
    seen: {
        type: Boolean,
        default: false
    }
})

export const message = mongoose.model("messages", messsageschema);