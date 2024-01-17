import mongoose from "mongoose";

export const connectDB=mongoose.connect(process.env.DATABASE_URI, {
   dbName: "messenger",
}).then(() => {
   console.log(`Database Connected ${process.env.DATABASE_URI}`)
}).catch((e) => {
   console.log(e);
})