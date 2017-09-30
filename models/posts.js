var mongoose = require('mongoose');

/*
 "code":"BAcyDyQwcXX",
 "caption":"Chamblee Mural #greatart",
 "likes":56,
 "id":"1161022966406956503",
 "display_src":"http://farm4.static.flickr.com/3008/2938962240_e9abbb431a.jpg"
 */

var postSchema = new mongoose.Schema({
  code: {type: String, required: false},
  likes: {type: Number, required: false},
  caption: {type: String, required: false},
  display_src: {type: String, required: false},
  created: {type: Date, default: Date.now}
});

module.exports = mongoose.model("post", postSchema);