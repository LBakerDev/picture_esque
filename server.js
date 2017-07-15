const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const picture = require("./models/picture")
const seedDB = require("./seeds")



//App configuration

mongoose.connect("mongodb://localhost/picture_esque");
app.set("view engine", "ejs");
app.use(express.static('public'));
// Line which is reused for body parser
app.use(bodyParser.urlencoded({extended: true}));
seedDB();

// Route to landing page
app.get("/", function(req,res) {
    res.render("landing");
});

// Route to index page
app.get("/pictures", function(req, res) {
    //Get all pictures from DB
    picture.find({}, function (err, allPictures) {
        if(err) {
            console.log(err)
        } else {
            res.render("index", {picture:allPictures})
        }
    })
})

// Route to post new sites

app.post("/pictures", function(req, res) {

    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var dateCreated= Date.now;
    var newPicture = {name:name, image: image, description:description, dateCreated: dateCreated}
  
    //create a new picture and save to DB
    picture.create(newPicture, function(err, newlyCreated) {
        if(err){
            console.log(err);
        } else {
            res.redirect("/pictures");
        }
    })
    //redirect to campgrounds page as a get request
});

//Displays form to make a new picture
app.get("/pictures/new", function(req, res) {
    res.render("new.ejs");
});

app.get("/pictures/:id", function(req, res) {
    //find picture with that ID
    //render show template with that picture
    picture.findById(req.params.id).populate("comments").exec(function (err, foundPicture) {
        if(err) {
            console.log(err);
        } else {
            res.render("show", {picture:foundPicture});
        }

    });
    

})

app.listen(8080 || process.env.Port, function () {
    console.log("Server is running");
});