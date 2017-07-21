const express = require("express");
const router = express.Router();
const picture = require("../models/picture");
const comment = require("../models/comment");

//=====================
// Comments routes
//=====================
// comments new
router.get("/pictures/:id/comments/new", isLoggedIn, function(req, res) {
    // find picture by id
    picture.findById(req.params.id, function(err, foundPicture) {
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {picture: foundPicture});
        }
    })
})

//comments create
router.post("/pictures/:id/comments", isLoggedIn, function (req, res) {
    // lookup picture using ID
    picture.findById(req.params.id).then((picture) => {}).catch(err => {res.redirect()})
    picture.findById(req.params.id, function(err, picture) {
        if(err) {
            res.redirect("/pictures");
        } else {
            //create new comment
            comment.create(req.body.comment, function(err, comment) {
                if(err) {
                    console.log(err);
                } else {
                    //connect new comment to campground then redirect to show picture
                    picture.comments.push(comment);
                    picture.save();
                    res.redirect("/pictures/" + picture._id);
                }
            })
        }
    })

});

//check to see if user is logged in
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");

};

module.exports = router;