const express = require("express");
const router = express.Router();
const passport = require("passport");
const user = require("../models/user");

// Route to landing page
router.get("/", function(req,res) {
    res.render("landing");
});

// Auth Routes
router.get("/register", function(req, res) {
    res.render("register");
})

//Sign-up Logic
router.post("/register", function(req, res) {
   
    var newUser = new user({username: req.body.username})
    user.register(newUser, req.body.password, function(err, user) {
        if(err) {
            console.log(err);
            return res.render("register")
        }
        passport.authenticate("local")(req, res, function() {
            res.redirect("/pictures");
        })
    });
})

// Show Login form
router.get("/login", function(req, res) {
    res.render("login");
});
//handle login logic. Middleware to verify proper user/pass
router.post("/login", passport.authenticate("local", 
{
    successRedirect: "/pictures",
    failureRedirect: "/login"
})
);

//Logout Route
router.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/pictures");
})

//check to see if user is logged in
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");

};

module.exports = router;