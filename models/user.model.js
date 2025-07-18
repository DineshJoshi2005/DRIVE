const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required:true,
        trim: true,
        lowercase: true,
        minlength: [3,'Usename should have atleaast 3 words']
    },
    email:{
        type: String,
        required: true,
        lowercase:true,
        trim: true
    },
    password:{
        type: String,
        required: true,
        trim: true,
        minlength: [3, "Password length is too short"]
    }
});

const userModel = mongoose.model('user',userSchema);

module.exports = userModel;