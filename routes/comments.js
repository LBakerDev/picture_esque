const express = require("express");
const router = express.Router();
const picture = require("../models/picture");
const comment = require("../models/comment");

//=====================
// Comments routes
//=====================
// comments new. Middleware "isLoggedIn" confirms user is logged in prior to seeing comment form
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

//comments create. Middleware "isLoggedIn" confirms user is logged in prior to post
router.post("/pictures/:id/comments", isLoggedIn, function (req, res) {
    // lookup picture using ID
    picture.findById(req.params.id).then((picture) => {}).catch(err => {res.redirect()})
    picture.findById(req.params.id, function(err, picture) {
        if(err) {
            res.redirect("/pictures");
        } else {
            
            comment.create(req.body.comment, function(err, comment) {
                if(err) {
                    console.log(err);
                } else {
                    // add username and id to comment
                    comment.author.id = req.user._id
                    comment.author.username = req.user.username;
                    //save comment
                    comment.save();
                    //connect new comment to picture then redirect to show picture
                    picture.comments.push(comment);
                    picture.save();
                    res.redirect("/pictures/" + picture._id);
                }
            })
        }
    })

});


//comment edit form route
router.get("/pictures/:id/comments/:comment_id/edit", function(req, res) {
    comment.findById(req.params.comment_id, function (err, foundComment) {
        if(err){
            res.redirect("back");

        } else{
            res.render("comments/edit" ,{picture_id: req.params.id, comment: foundComment});

        }
    })
})

//comments update route
router.put("/pictures/:id/comments/:comment_id", function(req, res) {
    comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment) {
        if(err) {
            res.redirect("back");
        } else {
            res.redirect("/pictures/" + req.params.id);
        }
    })

})

//check to see if user is logged in
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");

};

module.exports = router;