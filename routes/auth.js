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
            req.flash("error", err.message);
            return res.render("register")
        }
        passport.authenticate("local")(req, res, function() {
            req.flash("success", "Welcome to Picturesque " + user.username);
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
    req.flash("success", "Logged you out!");
    res.redirect("/pictures");
})

module.exports = router;