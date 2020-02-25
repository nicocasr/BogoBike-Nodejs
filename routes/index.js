const   express     = require('express'),
        router      = express.Router(),
        passport    = require('passport'),
        User        = require('../models/user');

// ROOT ROUTE
router.get("/", function(req, res){
    res.render("landing");
});


// =================
// AUTH ROUTES
// =================

router.get("/register", function(req, res){
    res.render("register");
});

router.post("/register", function(req, res){
    var newUser = new User({
        username: req.body.username, name: req.body.name,
        city: req.body.city,
        address: req.body.address,
        email: req.body.email
    });
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash('error', err.message);
            return res.redirect("register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash('success', "Welcome to BogoBike " + user.username);
            res.redirect("/map");
        });
    });
});

router.get("/login", function(req, res){
    res.render("login");
});

router.post("/login",passport.authenticate("local",
    {
        successRedirect: "/map",
        failureRedirect: "/login",
        failureFlash: true
    }), function(req, res){
});

router.get("/logout", function(req, res){
    req.logout();
    req.flash('success', "Logged out");
    res.redirect("/");
});

module.exports = router;