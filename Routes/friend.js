import express from "express";
import { isAuthorised } from "../MiddleWares/Auth.js";
import { addfriend, deleteFriend, myfriends, searchFriend } from "../controllers/friend.js";

const friendRouter=express.Router();

friendRouter.post("/add",isAuthorised,addfriend);
friendRouter.get("/all",isAuthorised,myfriends);
friendRouter.get("/search/:search",isAuthorised,searchFriend)
friendRouter.delete("/delete/:email",isAuthorised,deleteFriend)
// friendRouter.delete("/:id",isAuthorised,deleteMessages);

export default friendRouter;