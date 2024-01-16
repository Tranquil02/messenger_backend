import express from "express";
import { autoDeleteMsg, deleteMessages, receiveMessages, sendMessage, sentMessages } from "../controllers/message.js";
import { isAuthorised } from "../MiddleWares/Auth.js";
import { myfriends } from "../controllers/friend.js";

const messageRouter=express.Router();

messageRouter.post("/send/:email",isAuthorised,sendMessage);
messageRouter.get("/sent/:email",isAuthorised,sentMessages);
messageRouter.get("/receive/:email",isAuthorised,receiveMessages);
messageRouter.delete("/:id",isAuthorised,deleteMessages);
messageRouter.post("/autodel",isAuthorised,myfriends,autoDeleteMsg);

export default messageRouter;