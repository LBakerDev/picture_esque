const express = require("express");
const router = express.Router();
const posts = require("../models/posts");

/* localhost:8080/api/v1/posts */

router.get('/', function(req, res) {
  console.log('here');
  posts.find({}, function(err, allPosts) {
    return res.json(allPosts);
  });
});


router.post('/', function(req, res) {
  var newPost = req.body;
  posts.create(newPost, function(err, saved) {
    return res.json(saved);
  });
});

module.exports = router;