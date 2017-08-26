// all the middleware goes here
const middlewareObj = {};
const picture = require("../models/picture");
const comment = require("../models/comment");

middlewareObj.checkPictureOwnership = function (req, res, next) {
    if (req.isAuthenticated()) {
        picture.findById(req.params.id, function (err, foundPicture) {
            if (err) {
                req.flash("error", "Picture not found");
                res.redirect("back")
            } else {
                // does the user own the picture?
                if (foundPicture.author.id.equals(req.user._id)) {
                    // if user owns picture, we proceed to the next step
                    next();
                } else {
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });

    } else {
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function (req, res, next) {
    if (req.isAuthenticated()) {
        comment.findById(req.params.comment_id, function (err, foundComment) {
            if (err) {
                res.redirect("back")
            } else {
                // does the user own the comment?
                if (foundComment.author.id.equals(req.user._id)) {
                    // if user owns comment, we proceed to the next step
                    next();
                } else {
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });

    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function (req, res, next) {
  
        if(req.isAuthenticated()){
            return next();
        }
        req.flash("error", "You need to be logged in to do that");
        
        res.redirect("/login");
    
    };



module.exports = middlewareObj;