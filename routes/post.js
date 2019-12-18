var mongoose = require("mongoose"),
    express =   require("express"),
    User    = require("../models/user"),
    postModel    = require("../models/postModel"),
    router = express.Router(),
 middleware = require("../middleware/index");
    // comments = require


    router.get("/post", middleware.isLoggedIn, (req, res)=>{
        // res.render("post/create-post");
        res.render("post/new create");
    });


router.post("/post", middleware.isLoggedIn, (req, res)=>{
    var post = {
        topic: req.body.topic,
        category:req.body.category,
        article:req.body.article,
        author:{
            id: req.user._id,
            fullname: req.user.username
        },
        img: ""
    }
    if (post.category === "Computer Engineering"){
        post.img = "/images/cmp-eng.jpg"
    }
    if (post.category === "Chemical Engineering"){
        post.img = "/images/chemical.jpg"
    }
    if (post.category === "Electrical Engineering"){
        post.img = "/images/EE.jpg"
    }
    if (post.category === "Mechanical Engineering"){
        post.img = "/images/mech.jpg"
    }
    if (post.category === "Agricultural Engineering"){
        post.img = "/images/agriculture.jpg"
    }
    console.log(post);
    postModel.create(post, (err, newPost)=>{
        if(err){
            console.log(err)
        } else{
            res.redirect("/");
        }
    })
})

router.get("/post/:id/readmore", (req,res)=>{
    postModel.findById(req.params.id).populate("comments").exec((err,found)=>{
        if(err){
            console.log(err)
        }else{
            res.render("post/readmore", {foundPost:found});
            // res.render("post/readmore", {foundPost:found});
        }
    });   
});

router.get("/post/mechanical", (req, res)=>{
    postModel.find({category:"Mechanical Engineering"}, (err,foundPost)=>{
        if(err){
            console.log(err)
        }else{
            res.render("index",{foundPosts:foundPost});
        }
    })
});

router.get("/post/computer", (req, res)=>{
    postModel.find({category:"Computer Engineering"}, (err,foundPost)=>{
        if(err){
            console.log(err)
        }else{
            res.render("index",{foundPosts:foundPost});
        }
    })
})

router.get("/post/agric", (req, res)=>{
    postModel.find({category:"Agricultural Engineering"}, (err,foundPost)=>{
        if(err){
            console.log(err)
        }else{
            res.render("index",{foundPosts:foundPost});
        }
    })
})
router.get("/post/chem", (req, res)=>{
    postModel.find({category:"Chemical Engineering"}, (err,foundPost)=>{
        if(err){
            console.log(err)
        }else{
            res.render("index",{foundPosts:foundPost});
        }
    })
})
router.get("/post/elect", (req, res)=>{
    postModel.find({category:"Electrical Engineering"}, (err,foundPost)=>{
        if(err){
            console.log(err)
        }else{
            res.render("index",{foundPosts:foundPost});
        }
    })
})

router.get("/myPost", (req,res)=>{
    postModel.find({'author.id':req.user._id},(err,foundPosts)=>{
        if(err){
            console.log(err)
        }else{
            // res.render("post/myPost",{foundPosts:foundPosts});
            res.render("index",{foundPosts:foundPosts});
        }

    })
    
})

router.get("/post/:id/edit", middleware.isLoggedIn, (req,res)=>{
    postModel.findById(req.params.id, (err,foundPost)=>{
        if(err){
            console.log(err)
        }else{
            res.render("post/edit",{foundPost:foundPost});
        }

    })
    
})

router.put("/post/:id", middleware.isLoggedIn, (req,res)=>{
    var post = {
        topic: req.body.topic,
        category:req.body.category,
        article:req.body.article,
        author:{
            id: req.user._id,
            fullname: req.user.username
        },
        img: ""
    }
    if (post.category === "Computer Engineering"){
        post.img = "/images/cmp-eng.jpg"
    }
    if (post.category === "Chemical Engineering"){
        post.img = "/images/chemical.jpg"
    }
    if (post.category === "Electrical Engineering"){
        post.img = "/images/EE.jpg"
    }
    if (post.category === "Mechanical Engineering"){
        post.img = "/images/mech.jpg"
    }
    if (post.category === "Agricultural Engineering"){
        post.img = "/images/agriculture.jpg"
    }
    console.log(post);
    console.log(req.params.id);
    postModel.findByIdAndUpdate(req.params.id, post, (err,foundPost)=>{
        if(err){
            console.log(err)
        }else{
            res.redirect("/post/" + req.params.id + "/readmore");
        }

    })
    
})


router.delete("/post/:id", middleware.isLoggedIn, (req,res)=>{
    
    postModel.findByIdAndRemove(req.params.id,  (err,foundPost)=>{
        if(err){
            console.log(err)
        }else{
            res.redirect("/");
        }

    })
    
})








    module.exports = router;