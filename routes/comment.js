var express  = require ("express");
var router = express.Router();
var passport = require ("passport");
var User = require("../models/user");
var postModel = require("../models/postModel");
var Comment = require("../models/comments");
middleware = require("../middleware/index");


router.get("/post/:id/comments/new", middleware.isLoggedIn, (req, res)=>{
    postModel.findById(req.params.id, (err, foundPost)=>{
        if(err){
            console.log(err)
        }else{
            res.render("comments/comment",{foundPost:foundPost});
        }
    });    
})

router.post("/post/:id/comments", middleware.isLoggedIn, (req, res)=>{
    postModel.findById(req.params.id, (err, foundPost)=>{
        if(err){
            console.log(err)
        }else{
            console.log(req.body.comm);
            var com = {
                text: req.body.comm
            }
            Comment.create(com, (err, newComment)=>{
                if(err){
                    console.log(err)
                }else{
                    newComment.author.id = req.user._id;
                    newComment.author.username = req.user.username;
                    newComment.save();
                    foundPost.comments.push(newComment);
                    foundPost.save(); 
                    res.redirect("/post/"+foundPost._id+"/readmore"); 
                }
            });
        }
    });
});

router.get("/post/:comment_id/:id/comments/edit", middleware.isLoggedIn, (req, res)=>{
    Comment.findById(req.params.comment_id, (err, comment)=>{
        if(err){
            console.log(err)
        }else{
            res.render("comments/editComment",{comment:comment, postid:req.params.id});
        }
    });    
})

router.put("/post/:comment_id/:id/comments/edit", middleware.isLoggedIn, (req, res)=>{
    // console.log(" i got here");
    // console.log(req.body.comm);
    var com = {
        text: req.body.comm
    }
    Comment.findByIdAndUpdate(req.params.comment_id, com, function(err, comment){
        if(err){
            console.log(err)
        }else{
            // console.log(comment);
            // console.log("aaaaaaaaaaaaaa  " +com);

            res.redirect("/post/"+ req.params.id + "/readmore");
            
        }
    });    
})
router.delete("/post/:comment_id/:id/comments/delete", middleware.isLoggedIn, (req, res)=>{
    Comment.findByIdAndRemove(req.params.comment_id, function(err, comment){
        if(err){
            console.log(err)
        }else{
            // console.log(comment);
            // console.log("aaaaaaaaaaaaaa  " +com);

            // res.redirect("/post/"+foundPost._id+"/readmore");
            res.redirect("/post/" + req.params.id + "/readmore");
        }
    });    
})








module.exports = router