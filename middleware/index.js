var Comment = require("../models/comments");
var User = require("../models/user");
var Post = require("../models/postModel");




// all middle ware goes here 
var middlewareObj = {};

// middlewareObj.checkPostOwnership = function(req, res, next) {
//         if(req.isAuthenticated()) {
//             Campground.findById(req.params.id, function(err, foundCampground) {
//                 if(err){
//                     res.redirect("back");
//                 } else {
//                     if(foundCampground.author.id.equals(req.user._id)) {
//                         next();
//                     } else {
//                         res.redirect("back");
//                     }
//                 }
//             });       
//         } else {
//             res.redirect("back");
//         }    
// }

// middlewareObj.checkCommentOwnership = function(req, res, next) {
//         if (req.isAuthenticated()) {
//             console.log(req.params);
//             Comments.findById(req.params.comment_id, function (err, foundComment) {
//                 if (err) {
//                     res.redirect("back");
//                 } else {
//                     if (foundComment.author.id.equals(req.user._id)) {
//                         next();
//                     } else {
//                         res.redirect("back");
//                     }
//                 }
//             });       
//         } else {
//             res.redirect("back");
//         }
// }

middlewareObj.isLoggedIn = function(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }
        res.redirect("/login");
}


module.exports = middlewareObj;