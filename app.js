var express = require("express"),
    app =   express();
    bodyParser = require("body-parser"),
    mongoose =require("mongoose");
    methodOverride = require("method-override");
    passport = require("passport"),
    User = require("./models/user")
    LocalStrategy = require("passport-local");

    var indexRoutes = require("./routes/index");
    var postRoutes = require("./routes/post");
    var commentRoutes = require("./routes/comment");

    // mongoose.connect("mongodb://localhost:27017/ej", {useNewUrlParser: true});
    mongoose.connect("mongodb+srv://admin:admin@cluster0-kzl38.mongodb.net/test?retryWrites=true&w=majority", {useNewUrlParser: true});

    app.use(require("express-session")({
        secret: "glitch free technologies",
        resave:   false,
        saveUninitialized:  false
    }));

    app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.set("view engine", "ejs");  
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({extended: false}));





app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    // res.locals.success = req.flash('success');
//    res.locals.error = req.flash('error');
//    res.locals.failedlogin = req.flash('failedlogin');
//    if (req.path != "/login" && req.session.returnTo){
//        delete req.session.returnTo;
//    }
    next();
});
app.use(indexRoutes);
app.use(postRoutes);
app.use(commentRoutes);





    app.listen(process.env.PORT || 4000, function(){
        console.log("app is running");
    })
