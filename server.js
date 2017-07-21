const express = require('express');

const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const picture = require("./models/picture");
const comment = require("./models/comment");
const user = require("./models/user");
const seedDB = require("./seeds");

const pictureRoutes = require("./routes/pictures");
const commentRoutes = require("./routes/comments");
const authRoutes = require("./routes/auth");

//App configuration
const app = express();
mongoose.connect("mongodb://localhost/picture_esque");
app.set("view engine", "ejs");
app.use(express.static('public'));
// Line which is reused for body parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
seedDB();

// Passport Config
app.use(require("express-session")({
    secret: "The pictures are lit",
    resave: false,
    saveUninitialized: false

}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

//Middleware to check if user is logged in. Runs on every route
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    next();
});

// Telling server.js to use RESTFul routes
app.use("/pictures", pictureRoutes);
app.use(commentRoutes);
app.use(authRoutes);



app.listen(8080 || process.env.Port, function () {
    console.log("Server is running");
});


// app.post("/pictures/search", function (req, res) {
//     console.log(req.body);
//     picture.find(
//         {
//             name: new RegExp('/' + req.body.searchterm + '/')
//         }, function (err, foundPicture) {
//             console.log(foundPicture.length);
//             if(err) {
//                 return console.log(err);
//             }
//             res.render("pictures/index", {picture:foundPicture});
//         }
// )
// });
