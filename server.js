import { app } from "./app.js"
import { connectDB } from "./database/database.js";

connectDB; //connected to database

app.listen(4000, () => {
    console.log("server is working")
 })