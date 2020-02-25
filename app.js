const   express         = require('express'),
        app             = express(),
        bodyParser      = require('body-parser'),
        passport        = require('passport'),
        LocalStrategy   = require('passport-local'),
        User            = require("./models/user"),
        mongoose        = require('mongoose'),
        flash           = require('connect-flash'),
        Stores          = require('./models/stores'),
        middleware      = require('./middleware');
        
const   indexRoutes         = require("./routes/index"),
        informationRoutes   = require("./routes/information"),
        activityRoutes   = require("./routes/activities"),
        notificationRoutes   = require("./routes/notifications");

// var store = [
//     {storeName: "La Piñoneria",	storeAddress: "Ak. 9 #106-34, Bogota", storeLatitude: "4.6884945", storeLongitude: "-74.041492"},
//     {storeName: "Bicicleteria Albert",	storeAddress: "Ak. 15 #105A - 60, Bogotá"	, storeLatitude: "4.6899714", storeLongitude: "-74.0459941"},
//     {storeName:	"Bike House", storeAddress: "Ak. 15 #106-55, Bogota", storeLatitude: "4.6912933", storeLongitude: "-74.0456039"},
//     {storeName: "Beat Bike", storeAddress: "Ak. 19 #106-46, Bogotá", storeLatitude: "4.6930269", storeLongitude: "-74.0506679"},
//     {storeName: "Focus Bikes", storeAddress: "Ak. 19 #106A - 92, Bogotá, Cundinamarca", storeLatitude: "4.6936899", storeLongitude: "-74.050629"},
//     {storeName: "STL Bike Store", storeAddress: "Av Calle 116 #15-44, Bogotá", storeLatitude: "4.6967561", storeLongitude: "-74.0436324"},
//     {storeName: "Bikexperts BMC", storeAddress: "38Local 104 Carrera 7 #112, Bogotá", storeLatitude: "4.69103", storeLongitude: "-74.0337083"},
//     {storeName: "World Bikes Tour", storeAddress: "Av Calle 116 ##16-24, Bogotá, Cundinamarca", storeLatitude: "4.6974992", storeLongitude: "-74.0455556"},
//     {storeName: "Welcome", storeAddress: "Cl. 96 #10, Bogotá"	, storeLatitude: "4.6788881", storeLongitude: "-74.0449226"},
//     {storeName: "Power Bike", storeAddress: "Cra. 7a #126 A 25, Bogotá", storeLatitude: "4.7016721", storeLongitude: "-74.0301704"},
//     {storeName: "Bike Zone Todo En Bicicletas", storeAddress: "Cl. 106 #59 - 36, Bogotá", storeLatitude: "4.6934039", storeLongitude: "-74.0668443"},
//     {storeName: "Nissi 127", storeAddress: "Cl 127 #45-51, Bogotá, Cundinamarca", storeLatitude: "4.7066736", storeLongitude: "-74.0553162"}
// ];

// Stores.insertMany(store, function(err, shopsStored){
//     if(err){
//         console.log(err);
//     } else {
//         console.log("stores added correctly")
//     }
// });

mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);

// mongoose.connect("mongodb://localhost/bogobike");
mongoose.connect(
    process.env.DATABASEURL || 'mongodb+srv://nicocasr:39621798@bogobike-dj6mi.mongodb.net/test?retryWrites=true&w=majority', 
    {
        useNewUrlParser: true,
        useCreateIndex: true
    }
    // "mongodb+srv://nicocasr:39621798@cluster0-dj6mi.mongodb.net/?retryWrites=true&w=majority"
).then(() => {
    console.log("Connected to DB");
}).catch(err => {
    console.log("ERROR: ", err.message);
});


app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(flash());
// MAYBE REMOVE
// app.enable('trust proxy');

// PASSPORT CONFIG
app.use(require('express-session')({
    secret: "This could be whatever we want",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
});

app.use(indexRoutes);
app.use(informationRoutes);
app.use("/activities", activityRoutes);
app.use("/notifications", notificationRoutes);


app.listen(process.env.PORT || 3000, process.env.IP, function(){
    console.log('BogoBike Server Started!');
});