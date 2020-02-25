const   express     = require('express'),
        router      = express.Router(),
        Stores      = require('../models/stores'),
        // index.js is required by default when you just call the folder
        middleware  = require('../middleware'),
        geopip      = require('geoip-lite');


router.get("/map", function(req, res){
    Stores.find({}, function(err, allstores){
        if(err){
            console.log(err);
        } else {
            var stores = JSON.stringify(allstores);
            var geo = JSON.stringify(geopip.lookup('186.154.57.7'));
            if(geo === null){
                let geo = {lat: 4.6807434, lon: -74.084748}
            } 
            res.render("information/map", {stores, geo});
        }
    });
});
        
router.get("/stores", middleware.isLoggedIn, function(req, res){
    Stores.find({}, function(err, allstores){
        if(err){
            console.log(err);
            req.flash('error', "Something went wrong");
            res.redirect("back");
        } else {
            res.render("information/stores", {stores: allstores});
        }
    });
});


module.exports = router;