const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const user = require('./user');

const eventSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    date: {
        type: Date,
        // required: true,
    },
    email: {
        type: String,
        required: true,
    },
    user: {
        type: ObjectId,
        ref: user
    },
    link: {
        type: String,
        required: true,
    },

}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);