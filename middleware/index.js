const   path    = require('path'),
        multer  = require('multer'),
        uuid    = require('uuid/v4');

var middlewareObj = {};

// CHECK IF LOGGED IN
middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash('error', "You need to be logged");
    res.redirect("/login");
}

// SAVE FILES
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join(__dirname, '../public/images/events'));
    },
    filename: function(req, file, cb){
        cb(null, uuid() + path.extname(file.originalname).toLowerCase());
    }
});

middlewareObj.upload = multer({
    storage: storage,
    fileFilter: function(req, file, cb){
        const fileTypes = /jpg|jpeg|png|gif/;
        const mimetype = fileTypes.test(file.mimetype);
        const extname = fileTypes.test(path.extname(file.originalname));
        if(mimetype && extname){
            return cb(null, true);
        }
        cb(null, false);
    }
}).single('file')

module.exports = middlewareObj;