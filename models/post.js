const mongoose = require("mongoose");
const user = require("./user");
const { ObjectId } = mongoose.Schema;

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    Description: {
        type: String,
        required: true
    },
    user: {
        type: ObjectId,
        ref: user,
        required: true
    },
    link: {
        type: String,
    },
    expiresIn: {
        type: Date,
    },
    domain: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    comments: [{
        comment: {
            type: String,
        },
        image: {
            type: String,
        },
        commentBy: {
            type: ObjectId,
            ref: "User",
        },
        commentAt: {
            type: Date,
            default: new Date(),
        },
    }, ],

}, { timestamps: true })

module.exports = mongoose.model("post", postSchema);