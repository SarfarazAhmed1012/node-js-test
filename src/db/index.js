import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`MONGO DB Connected !! HOST NO:${connectionInstance.connection.host}`)
    } catch (err) {
        console.log("Mongo DB connection Error", err)
        process.exit(1)
    }
}

export default connectDB