const express = require("express");
const router = express.Router();
const picture = require("../models/picture");
const comment = require("../models/comment");
const middleware = require("../middleware");



// Route to index page
router.get("/", function (req, res) {
    //Get all pictures from DB
    picture.find({}, function (err, allPictures) {
        if (err) {
            console.log(err)
        } else {
            res.render("pictures/index", { picture: allPictures, currentUser: req.user })
        }
    });
});

// Route to post new sites

router.post("/", middleware.isLoggedIn, function (req, res) {

    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    // attaching author to posted picture by reference once signed in
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var dateCreated = Date.now;
    var newPicture = { name: name, image: image, description: description, dateCreated: dateCreated, author: author }

 
    //create a new picture and save to DB
    picture.create(newPicture, middleware.isLoggedIn, function (err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            console.log(newlyCreated);
            res.redirect("/pictures");

        }
    })

});

//Displays form to make a new picture
router.get("/new", middleware.isLoggedIn, function (req, res) {
    res.render("pictures/new");
});

router.get("/:id", function (req, res) {
    //find picture with that ID
    //render show template with that picture
    picture.findById(req.params.id).populate("comments").exec(function (err, foundPicture) {
        if (err) {
            console.log(err);
        } else {
            res.render("pictures/show", { picture: foundPicture });
        }

    });
});

//Edit photo
router.get("/:id/edit", middleware.checkPictureOwnership, function (req, res) {
    picture.findById(req.params.id, function (err, foundPicture) {
        res.render("pictures/edit", { picture: foundPicture });

    }
    );
});
  
// Update picture

router.put("/:id", middleware.checkPictureOwnership, function (req, res) {
    //find and update the correct picture
    picture.findByIdAndUpdate(req.params.id, req.body.picture, function (err, updatedPicture) {
        if (err) {
            res.redirect("/pictures");

        } else {
            //redirect to show page
            res.redirect("/pictures/" + req.params.id);
        }
    })
});

// Destroy picture route
router.delete("/:id", middleware.checkPictureOwnership, function (req, res) {
    picture.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            res.redirect("/pictures");
        } else {
            res.redirect("/pictures");
        }
    })

})

module.exports = router;
