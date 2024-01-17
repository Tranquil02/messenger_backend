import { friend } from "../models/friend.js";
import { message } from "../models/message.js";
// import {} from "r"
import { User } from "../models/user.js";


export const addfriend = async (req, res, next) => {
    const { email } = req.body;
    const myId = req.user._id;
    const myemail = req.user.email;
    let friendId = await User.findOne({ email });
    // console.log(friendId)
    if (!friendId) return res.status(404).json({
        success: true,
        message: "No such email found"
    })
    if (email === myemail) return res.status(404).json({
        success: false,
        message: "cannot add same person"
    })
    let isfriend = await friend.findOne({ email, myId });
    const isAlreadyfriend = await friend.findOne({ email: myemail, myId: friendId });
    if (isfriend || isAlreadyfriend) return res.status(404).json({
        success: false,
        message: "This is already friend"
    })
    const name = friendId.name;
    await friend.create({
        friendId, myId, name, email
    })
    await friend.create({
        friendId: myId, myId: friendId, name: req.user.name, email: myemail
    })

    res.status(201).json({
        success: true,
        message: "friend add successfull"
    })
}

export const myfriends = async (req, res, next) => {
    const myId = req.user._id;
    let friends = await friend.find({ myId });
    if (friends.length === 0) return res.status(404).json({
        success: false,
        message: "No friends"
    })
    req.friends = friends;
    // console.log(req.friends)
    res.status(200).json({
        success: true,
        friends
    })
    next();
}

export const searchFriend = async (req, res, next) => {
    try {
        const { search } = req.params;
        // Create a case-insensitive regular expression for partial matching
        const regex = new RegExp(search, 'i');
        // Use the regex in the query to find Users with names matching the pattern
        let Users = await User.find({ name: { $regex: regex } });

        const myId = req.user.id;
        const filteredUsers = Users.filter(User => User._id.toString() !== myId);
        Users = filteredUsers;
        if (!Users.length) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            })
        }

        return res.status(200).json({
            success: true,
            Users
        })
    } catch (error) {
        console.log(error)
    }
}
export const deleteFriend = async (req, res) => {
    const { email } = req.params;
    
    try {
        const friendId = await User.findOne({email});
        // console.log(friendId);
        const myId = req.user.id;

        await friend.deleteOne({ friendId: friendId, myId: myId });
        await friend.deleteOne({ friendId: myId, myId: friendId });

        // Delete messages associated with the friend
        // await message.deleteMany({ nextid: friendId, myid: myId });
        // await message.deleteMany({ nextid: myId, myid: friendId });

        return res.status(200).json({ success: true, message: 'Friend delete successfull' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};