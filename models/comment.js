var mongoose = require("mongoose");

var commentSchema = mongoose.Schema({
    text: String,
    author: {
        //reference to user model ID
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        },
        
        username:String
    }
});

module.exports = mongoose.model("comment", commentSchema);