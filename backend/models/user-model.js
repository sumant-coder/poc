const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
    name :{
        type: String,
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    contact: {
        type: String
    }

});

Schema.set("timestamps", true);
module.exports = mongoose.model("Users", Schema);