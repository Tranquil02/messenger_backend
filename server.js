import { app } from "./app.js"
import { connectDB } from "./database/database.js";

connectDB; //connected to database

app.listen(process.env.PORT, () => {
    console.log(`server is working at ${process.env.PORT}`)
 })