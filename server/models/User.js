const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        min: 3,
        required: true, 
        unique: true
    },
    password: {
        type: String,
        min: 8,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    avatar: {
        type: String
    }
})

module.exports = mongoose.model('User', userSchema)