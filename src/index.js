import dotenv from "dotenv"
import connectDB from "./db/index.js";
import { app } from './app.js'
dotenv.config({
    path: './.env'
})



connectDB()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
        })
    })
    .catch((err) => {
        console.log("MONGO db connection failed !!! ", err);
    })





// DB Connection IIFE approach
// (async () => {
//     try {
//         await mongoose.connect(`${process.env.DATABASE_URI}/${DB_NAME}`)
//         app.on("error", (err) => {
//             console.log("Error:", err)
//             throw err
//         })
//         app.listen(process.env.PORT, () => {
//             console.log("Listening on port:", process.env.PORT)
//         })

//     } catch (err) {
//         console.log("Error:", err)
//     }
// })()