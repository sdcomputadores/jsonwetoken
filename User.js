const mongoose = require("mongoose")

const User = mongoose.model('User', {
    name: String,
    email: String,
    password: String,
    comfirmpassword: String
}) 

module.exports = User