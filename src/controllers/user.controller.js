import ApiError from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";
export const registerUser = asyncHandler(async (req, res) => {

    const { fullname, email, password, username } = req.body;
    console.log(fullname, email, password)

    if ([fullname, email, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required")
    }

    const userFound = await User.findOne({
        $or: [{ username }, { email }]
    })

    console.log(userFound)
    if (userFound) {
        throw new ApiError(409, "User already exists")
    }

    const avatarImageLocalPath = req.files?.avatar[0].path
    let coverImageLocalPath
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files?.coverImage[0].path
    }
    // const coverImageLocalPath = req.files?.coverImage[0].path

    if (!avatarImageLocalPath) {
        throw new ApiError(400, "Avatar image is required")
    }

    console.log(req.files)

    // console.log(avatarImageLocalPath, coverImageLocalPath)

    const avatar = await uploadOnCloudinary(avatarImageLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if (!avatar) {
        throw new ApiError(500, "Error uploading avatar image")
    }

    const user = await User.create({
        username: username.toLowerCase(),
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email: email.toLowerCase(),
        password,
        fullname
    })

    const userCreated = await User.findById(user._id).select("-password -refreshToken")

    if (!userCreated) {
        throw new ApiError(500, "Something went wrong while registering user")
    }

    return res.status(201).json(
        new ApiResponse(200, userCreated, "User created successfully")
    )
})