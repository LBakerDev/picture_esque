const express = require("express");
const router = express.Router();
const picture = require("../models/picture");
const comment = require("../models/comment");

// Route to index page
router.get("/", function(req, res) {
    //Get all pictures from DB
    picture.find({}, function (err, allPictures) {
        if(err) {
            console.log(err)
        } else {
            res.render("pictures/index", {picture:allPictures, currentUser: req.user})
        }
    });
});

// Route to post new sites

router.post("/", isLoggedIn, function(req, res) {

    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var dateCreated= Date.now;
    var newPicture = {name:name, image: image, description:description, dateCreated: dateCreated}
  
    //create a new picture and save to DB
    picture.create(newPicture, isLoggedIn, function(err, newlyCreated) {
        if(err){
            console.log(err);
        } else {
            res.redirect("/pictures");
        }
    })
    //redirect to campgrounds page as a get request
});

//Displays form to make a new picture
router.get("/new", isLoggedIn, function(req, res) {
    res.render("pictures/new");
});

router.get("/:id", function(req, res) {
    //find picture with that ID
    //render show template with that picture
    picture.findById(req.params.id).populate("comments").exec(function (err, foundPicture) {
        if(err) {
            console.log(err);
        } else {
            res.render("pictures/show", {picture:foundPicture});
        }

    });
});

//check to see if user is logged in
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");

};

module.exports = router;
