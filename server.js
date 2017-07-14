const express = require('express');
const app = express();
const bodyParser = require('body-parser');

//App configuration
app.set("view engine", "ejs");
app.use(express.static('public'));
// Line which is reused for body parser
app.use(bodyParser.urlencoded({extended: true}));

 var campgrounds=[
        {name: "Salmon Creek", image: "https://saudervillage.org/images/default-source/stay/sauder-village-campground-carousel/campground-sauder-village1.jpg?sfvrsn=2"},
        {name: "The Place", image: "http://www.fondulacpark.com/wp-content/uploads/2015/01/campground-pic-1.jpg"},
        {name: "The Ravine", image: "http://www.yellowstonenationalparklodges.com/wp-content/gallery/bridge-bay-campground/bridge-bay-campground-1.jpg"},
        {name: "The Ravine", image: "http://www.yellowstonenationalparklodges.com/wp-content/gallery/bridge-bay-campground/bridge-bay-campground-1.jpg"},
        {name: "The Ravine", image: "http://www.yellowstonenationalparklodges.com/wp-content/gallery/bridge-bay-campground/bridge-bay-campground-1.jpg"},
        {name: "The Ravine", image: "http://www.yellowstonenationalparklodges.com/wp-content/gallery/bridge-bay-campground/bridge-bay-campground-1.jpg"},
        {name: "The Ravine", image: "http://www.yellowstonenationalparklodges.com/wp-content/gallery/bridge-bay-campground/bridge-bay-campground-1.jpg"},
        {name: "The Ravine", image: "http://www.yellowstonenationalparklodges.com/wp-content/gallery/bridge-bay-campground/bridge-bay-campground-1.jpg"}
        ]



// Route to landing page
app.get("/", function(req,res) {
    res.render("landing");
});

// Route to index page
app.get("/campgrounds", function(req, res) {
    res.render("campgrounds", {campgrounds:campgrounds});
})

// Route to post new sites

app.post("/campgrounds", function (req, res) {
    // get data from form and add to campgrounds array
    
    var name = req.body.name;
    var image = req.body.image;
    var newCampground= {name: name, image: image}
    campgrounds.push(newCampground);
    //redirect to campgrounds page as a get request
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res) {
    res.render("new.ejs");
});

app.listen(8080 || process.env.Port, function () {
    console.log("Server is running");
});