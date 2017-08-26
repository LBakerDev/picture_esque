// all the middleware goes here
const middlewareObj = {};
const picture = require("../models/picture");

middlewareObj.checkPictureOwnership = function (req, res, next) {
    if (req.isAuthenticated()) {
        picture.findById(req.params.id, function (err, foundPicture) {
            if (err) {
                res.redirect("back")
            } else {
                // does the user own the picture?
                if (foundPicture.author.id.equals(req.user._id)) {
                    // if user owns picture, we proceed to the next step
                    next();
                } else {
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
                    res.redirect("back");
                }
            }
        });

    } else {
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function (req, res, next) {
  
        if(req.isAuthenticated()){
            return next();
        }
        res.redirect("/login");
    
    };



module.exports = middlewareObj;