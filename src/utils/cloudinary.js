import { v2 as cloudinary } from "cloudinary";
import fs from "fs"

// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (filePath) => {
    try {
        if (!filePath) return null

        // upload the file on cloudinary
        const result = await cloudinary.uploader.upload(filePath, { resource_type: "auto" })
        console.log("file uploaded", result.url, filePath)
        fs.unlinkSync(filePath)
        return result

    } catch (error) {
        fs.unlinkSync(filePath)

        return null
    }
}

export { uploadOnCloudinary }