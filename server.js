const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const picture = require("./models/picture");
const comment = require("./models/comment");
const seedDB = require("./seeds");



//App configuration

mongoose.connect("mongodb://localhost/picture_esque");
app.set("view engine", "ejs");
app.use(express.static('public'));
// Line which is reused for body parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
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
            res.render("pictures/index", {picture:allPictures})
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
    res.render("pictures/new");
});

app.get("/pictures/:id", function(req, res) {
    //find picture with that ID
    //render show template with that picture
    picture.findById(req.params.id).populate("comments").exec(function (err, foundPicture) {
        if(err) {
            console.log(err);
        } else {
            res.render("pictures/show", {picture:foundPicture});
        }

    });
})

//=====================
// Comments routes
//=====================

app.get("/pictures/:id/comments/new", function(req, res) {
    // find picture by id
    picture.findById(req.params.id, function(err, foundPicture) {
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {picture: foundPicture});
        }
    })
})

app.post("/pictures/:id/comments", function (req, res) {
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
                    picture.comments.push(comment);
                    picture.save();
                    res.redirect("/pictures/" + picture._id);
                }
            })
        }
    })
    // create new comment
    // connect new comment to campground

})

app.post("/pictures/search/:searchterm", function (req, res) {
    picture.find(
        {
            name: new RegExp('/' + req.params.searchterm + '/')
        }, function (err, pictures) {
            if(err) {
                return console.log(err);
            }
            res.render("index");
        }
)
});

app.listen(8080 || process.env.Port, function () {
    console.log("Server is running");
});