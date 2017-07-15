var mongoose = require("mongoose");
var picture = require("./models/picture");
var comment = require("./models/comment");

// Database information for seeding
var data = [
    {
        name: "Chamblee Mural",
        image: "http://farm4.static.flickr.com/3008/2938962240_e9abbb431a.jpg",
        description: "Great artwork in the city of Chamblee"
    },

    {
        name: "Fox Theatre",
        image: "http://www.planetware.com/photos-large/USGA/georgia-atlanta-fox-theatre.jpg",
        description: "Great venue for shows and entertainment"

    },
    {
        name: "The Varsity",
        image: "http://sites.gsu.edu/jbergstrom1/files/2016/04/drive-in-2n33q0e.jpg",
        description: "Legendary Eatery with old school vibes"
    },
    {
        name: "SkyView Atlanta",
        image: "http://3tsll33cscvk11pae33oze51-wpengine.netdna-ssl.com/wp-content/uploads/2014/02/atlanta-ferris-wheel.jpg",
        description: "Downtown ferris wheel which offers great views"
    }
];

function seedDB() {
    //remove all pictures
    picture.remove({}, function (err) {
        if (err) {
            console.log(err)
        } else {
            console.log("removed photos");
        }
        data.forEach(function (seed) {
            picture.create(seed, function (err, picture) {
                if (err) {
                    console.log(err)
                } else {
                    console.log("Added Picture")
                }
                //create a comment
                comment.create(
                    {
                        text: "I love this place, its spectacular",
                        author: "Jason"
                    }, function (err, comment) {
                        if (err) {
                            console.log(err);
                        } else {
                            picture.comments.push(comment);
                            picture.save();
                            console.log("Created New comment");

                        }
                    });
            });
        });
    });
};

module.exports = seedDB;
