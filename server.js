const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require("mongoose");

//App configuration
mongoose.connect("mongodb://localhost/picture_esque");
app.set("view engine", "ejs");
app.use(express.static('public'));
// Line which is reused for body parser
app.use(bodyParser.urlencoded({extended: true}));

// Schema Setup
var pictureSchema = new mongoose.Schema({
    name:{type: String, required: false},
    image: {type: String, required: false},
    body: {type: String, required: false},
    created: {type: Date, default: Date.now}
});

var picture = mongoose.model("picture", pictureSchema);

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
            res.render("pictures", {picture:allPictures})
        }
    })
})

// Route to post new sites

app.post("/pictures", function(req, res) {

    var name = req.body.name;
    var image = req.body.image;
    var newPicture = {name:name, image: image}
  
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

app.get("/pictures/new", function(req, res) {
    res.render("new.ejs");
});

app.listen(8080 || process.env.Port, function () {
    console.log("Server is running");
});