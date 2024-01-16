import { message } from "../models/message.js";
import { user } from "../models/user.js";
import Jwt from "jsonwebtoken";

export const sendMessage = async (req, res, next) => {
    try {
        const { text } = req.body;
        const { email } = req.params;
        let nextid = await user.findOne({ email })
        if (!nextid) return res.status(404).json({
            success: true,
            message: "Invalid user Id"
        })
        nextid = nextid._id;
        const name = nextid.name;
        const date = new Date(Date.now());
        // console.log(date)
        const myid = await req.User._id;
        const myemail = await req.User.email;
        if (email === myemail) return res.status(404).json({
            success: false,
            message: "cannot add same person"
        })
        await message.create({
            text, myid, nextid, email, name, time: date
        })
        res.status(201).json({
            success: true,
            message: "send Success"
        })
    } catch (error) {
        console.log(error);
    }

}

const fetchMessages = async (res, myid, otherUserId, sent) => {
    try {
        const query = sent ? { myid, nextid: otherUserId } : { myid: otherUserId, nextid: myid };
        const messages = await message.find(query).sort({ timestamp: 1 });

        res.status(200).json({
            success: true,
            messages
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error fetching messages"
        });
    }
};

export const sentMessages = async (req, res) => {
    try {
        const { email } = req.params;
        const myid = req.User._id;
        const nextUser = await user.findOne({ email });

        if (!nextUser) {
            return res.status(404).json({
                success: false,
                message: "Invalid user Id"
            });
        }

        const nextid = nextUser._id;
        await fetchMessages(res, myid, nextid, true);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error fetching messages"
        });
    }
};

export const receiveMessages = async (req, res) => {
    try {
        const { email } = req.params;
        const myid = req.User._id;
        const nextUser = await user.findOne({ email });

        if (!nextUser) {
            return res.status(404).json({
                success: false,
                message: "Invalid user Id"
            });
        }

        const nextid = nextUser._id;
        await fetchMessages(res, myid, nextid, false);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error fetching messages"
        });
    }
};

export const deleteMessages = async (req, res, next) => {
    try {
        const myMessage = await message.findById(req.params.id);

        if (!myMessage) return res.status(200).json({
            success: true,
            message: "Invalid Tasks"
        })

        await message.deleteOne({ _id: req.params.id });
        res.json({
            success: true,
            message: "Task Deleted"
        })
    } catch (error) {
        next(error)
    }
}

export const autoDeleteMsg = (req, res) => {
    const array = ['apple', 'banana', 'orange'];
    const searchString = 'banana';
    if (array.includes(searchString)) {
        console.log(`${searchString} is in the array.`);
    } else {
        console.log(`${searchString} is not in the array.`);
    }
    const { email } = req.body;
    if ((req.friends).includes(email)) {
        console.log(friend)
    }

}