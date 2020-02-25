const   express     = require('express'),
        router      = express.Router(),
        User        = require('../models/user'),
        uuid        = require('uuid/v4'),
        // index.js is required by default when you just call the folder
        middleware  = require('../middleware');

const notifications = [];
const posibleNotifications = ['Stranded', 'Robbed', 'Road Being Repaired', 'Crash', 'Roadblock'];


router.get("/", middleware.isLoggedIn, function(req, res){
    res.render("notifications/new");    
});

router.post("/", middleware.isLoggedIn, function(req, res){
    let notification = {
        user: req.user.name,
        city: req.user.city,
        address: req.user.address,
        info: req.body.notification,
        notificationId: uuid()
    };
    if(posibleNotifications.includes(notification.info)){
        notifications.push(notification);
        req.flash('success', 'Notification sent');
        return res.redirect("back");
    }
    req.flash('error', 'Notification not valid');
    res.redirect("back");
});

router.get("/checkNotifications", middleware.isLoggedIn, function(req, res){
    if(notifications.length > 0){
        return res.json(notifications);
    }
    res.json(0);
});

router.post("/removeNotification", middleware.isLoggedIn, function(req, res){
    for(var i = 0; i < notifications.length; i++){
        if(notifications[i].notificationId === req.body.notificationId){
            notifications.splice(i, 1);
        }
    }
});
module.exports = router;