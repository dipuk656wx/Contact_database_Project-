const moongose = require('mongoose');

const userSchema = moongose.Schema({
    username: {
        type: String,
        required: [true, "Please add the contact name"]
    },
    email: {
        type: String,
        required: [true, "Please add the contact name"],
        unique: [true, "email already axist"]
    },
    password: {
        type: String,
        required: [true, "Please add the password"]
    }
})
module.exports = moongose.model("User", userSchema);