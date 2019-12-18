var express  = require ("express");
var router = express.Router();
var passport = require ("passport");
var User = require("../models/user");
var postModel = require("../models/postModel");
var middleware = require("../middleware/index");

router.get("/", function(req, res){
    console.log(req.user);
    let perPage =9;
    let pageQuery = parseInt(req.query.page);
    let pageNumber = pageQuery ? pageQuery:1;
    let noMatch = null;
    postModel.find({}).sort({created: 'desc'}).skip((perPage * pageNumber)-perPage).limit(perPage).exec(function(err, foundPosts){
        postModel.count().exec(function(err,count){
            if(err){
                console.log(err);
            } else {
                res.render("index", {
                    foundPosts: foundPosts,
                    path: "",
                    current: pageNumber,
                    pages: Math.ceil(count/perPage),
                    noMatch:noMatch,
                    search: false
                });
            }
        })
        
        });
        
    });
   
    router.get("/mechanical", (req, res)=>{
        postModel.find({category:"Mechanical Engineering"}, (err,foundPost)=>{
            if(err){
                console.log(err)
            }else{
                res.render("index",{foundPosts:foundPost});
            }
        })
    });


// router.get("/read", function(req, res){
//     res.render("readmore");
// });

router.get("/login", function(req, res){
    res.render("newlogin");
});



router.post("/login", passport.authenticate("local", 
{
    successRedirect: "/",
    failureRedirect: "/login"
}), function(req, res){    
});

router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
});

router.get("/signup", function(req, res){
    res.render("newsignup");
});

router.post("/signup", function(req, res){
    // console.log("iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii");
    // console.log(req.body.email);
    // console.log(req.body);
    var newUser = new User({
        fullname: req.body.fullname,
        username: req.body.username,
        email: req.body.email,
        admin: false
    });
    User.register(newUser, req.body.password, function(err, user){
        if (err){
            console.log(err);
            return res.redirect("/signup");
        }   else {
            passport.authenticate("local")(req, res, function(){
                res.redirect("/"); 
            });
        }
    });
});

module.exports = router;