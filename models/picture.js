var mongoose = require("mongoose");


// Schema Setup
var pictureSchema = new mongoose.Schema({
    name:{type: String, required: false},
    image: {type: String, required: false},
    description: {type: String, required: false},
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "comment"
        }
    ],
    created: {type: Date, default: Date.now}
});


module.exports = mongoose.model("picture", pictureSchema);