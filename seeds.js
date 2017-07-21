var mongoose = require("mongoose");
var picture = require("./models/picture");
var comment = require("./models/comment");

// Database information for seeding
var data = [
    {
        name: "Chamblee Mural",
        image: "http://farm4.static.flickr.com/3008/2938962240_e9abbb431a.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras quis elit ac ligula viverra interdum a vel dui. Etiam efficitur quam quis lorem cursus laoreet. Vivamus vel tortor posuere, cursus libero ut, condimentum risus. Nunc tristique velit libero, eu placerat mauris tincidunt ut. Maecenas quis mi tortor. Integer rutrum luctus venenatis"
    },

    {
        name: "Fox Theatre",
        image: "http://www.planetware.com/photos-large/USGA/georgia-atlanta-fox-theatre.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras quis elit ac ligula viverra interdum a vel dui. Etiam efficitur quam quis lorem cursus laoreet. Vivamus vel tortor posuere, cursus libero ut, condimentum risus. Nunc tristique velit libero, eu placerat mauris tincidunt ut. Maecenas quis mi tortor. Integer rutrum luctus venenatis"

    },
    {
        name: "The Varsity",
        image: "http://sites.gsu.edu/jbergstrom1/files/2016/04/drive-in-2n33q0e.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras quis elit ac ligula viverra interdum a vel dui. Etiam efficitur quam quis lorem cursus laoreet. Vivamus vel tortor posuere, cursus libero ut, condimentum risus. Nunc tristique velit libero, eu placerat mauris tincidunt ut. Maecenas quis mi tortor. Integer rutrum luctus venenatis"
    },
    {
        name: "SkyView Atlanta",
        image: "http://3tsll33cscvk11pae33oze51-wpengine.netdna-ssl.com/wp-content/uploads/2014/02/atlanta-ferris-wheel.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras quis elit ac ligula viverra interdum a vel dui. Etiam efficitur quam quis lorem cursus laoreet. Vivamus vel tortor posuere, cursus libero ut, condimentum risus. Nunc tristique velit libero, eu placerat mauris tincidunt ut. Maecenas quis mi tortor. Integer rutrum luctus venenatis"
    },
    {
        name: "Chamblee Mural",
        image: "http://farm4.static.flickr.com/3008/2938962240_e9abbb431a.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras quis elit ac ligula viverra interdum a vel dui. Etiam efficitur quam quis lorem cursus laoreet. Vivamus vel tortor posuere, cursus libero ut, condimentum risus. Nunc tristique velit libero, eu placerat mauris tincidunt ut. Maecenas quis mi tortor. Integer rutrum luctus venenatis"
    },

    {
        name: "Fox Theatre",
        image: "http://www.planetware.com/photos-large/USGA/georgia-atlanta-fox-theatre.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras quis elit ac ligula viverra interdum a vel dui. Etiam efficitur quam quis lorem cursus laoreet. Vivamus vel tortor posuere, cursus libero ut, condimentum risus. Nunc tristique velit libero, eu placerat mauris tincidunt ut. Maecenas quis mi tortor. Integer rutrum luctus venenatis"

    },
    {
        name: "The Varsity",
        image: "http://sites.gsu.edu/jbergstrom1/files/2016/04/drive-in-2n33q0e.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras quis elit ac ligula viverra interdum a vel dui. Etiam efficitur quam quis lorem cursus laoreet. Vivamus vel tortor posuere, cursus libero ut, condimentum risus. Nunc tristique velit libero, eu placerat mauris tincidunt ut. Maecenas quis mi tortor. Integer rutrum luctus venenatis"
    },
    {
        name: "SkyView Atlanta",
        image: "http://3tsll33cscvk11pae33oze51-wpengine.netdna-ssl.com/wp-content/uploads/2014/02/atlanta-ferris-wheel.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras quis elit ac ligula viverra interdum a vel dui. Etiam efficitur quam quis lorem cursus laoreet. Vivamus vel tortor posuere, cursus libero ut, condimentum risus. Nunc tristique velit libero, eu placerat mauris tincidunt ut. Maecenas quis mi tortor. Integer rutrum luctus venenatis"
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
        data.forEach(insertData);
    });
};

function insertData(seed) {
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
}

module.exports = seedDB;
