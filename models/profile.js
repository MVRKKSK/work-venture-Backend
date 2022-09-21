const mongoose = require("mongoose")
const ObjectId = mongoose.ObjectId

const profileSchema = new mongoose.Schema({
    user: {
        type: ObjectId,
        ref: "user"
    },
    bio: {
        type: String,
        default: "Hello this is my bio"
    },
    socials: {
        youtube: {
            type: String
        },
        twitter: {
            type: String
        },
        facebook: {
            type: String
        },
        instagram: {
            type: String
        }
    },
}, { timestamps: true })

module.exports = mongoose.model("profile", profileSchema)