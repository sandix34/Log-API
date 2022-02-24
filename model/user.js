const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    password: {
        type: String,
        required: [true,"Password is required"]
    },
    email: {
        type: String,
        required: [true, "Email address is required"],
        unique: true,
        lowercase: true,
        trim: true
    },
    token: {
        type: String
    }
});

const User = mongoose.model('User', userSchema);
console.log(User);

module.exports = User;