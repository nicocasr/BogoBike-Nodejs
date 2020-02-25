const   express     = require('express'),
        router      = express.Router(),
        Activity    = require('../models/activities'),
        // index.js is required by default when you just call the folder
        middleware  = require('../middleware'),
        multer      = require('multer');


router.get("/", middleware.isLoggedIn, function(req, res){
    Activity.find({}, function(err, foundActivities){
        if(err){
            req.flash("error", "Activities are not available");
            res.redirect("back");
        } else {
            res.render("activities/show", {foundActivities: foundActivities});
        }
    });
});

router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("activities/new");
});

router.post("/", middleware.isLoggedIn, middleware.upload,function(req, res){
    if(!req.file){
        req.flash('error', 'You need to provide an image');
        return res.redirect("back");
    }
    var type        = req.body.type,
        startPoint  = req.body.startPoint,
        endPoint    = req.body.endPoint,
        organizer   = req.body.organizer,
        complexity  = req.body.complexity,
        date        = new Date(req.body.date),
        description = req.body.description,
        user        = {
            id: req.user._id,
            name: req.user.name
        },
        img         = req.file.filename;

    var now = new Date();
    console.log(date +  " ------------ " + now);
    if(date < now){
        console.log(date +  " ------------ " + now);
        req.flash('error', 'Date not valid');
        return res.redirect("back");
    }

    var newActivity = {
        type: type, 
        startPoint: startPoint, 
        endPoint: endPoint, 
        organizer: organizer, 
        complexity: complexity,
        date: date,
        description: description,
        user: user,
        img: img
    };

    Activity.create(newActivity, function (err, newlyActivity){
        if(err){
            console.log(err);
            req.flash("error", "Activity was not created, try later");
            res.redirect("back");
        } else {
            res.redirect("/activities");
        }
    });
});

module.exports = router;