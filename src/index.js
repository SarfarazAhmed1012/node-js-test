import dotenv from "dotenv"
import express from "express"
import connectDB from "./db/index.js";

dotenv.config({
    path: "./env"
})

const app = express()
const PORT = process.env.PORT || 8000

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Listening on port: ${PORT}`)
    })
}).catch((err) => {
    console.log(`Mongo DB connection failed !!! ${err}`)
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