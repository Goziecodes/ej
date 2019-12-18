var mongoose        =   require("mongoose"),
    User            =   require("../models/user");


    var postSchema = new mongoose.Schema({
        topic:  {type: String, unique: true},
        category:   String,
        article:    String,
        img:  String,
        author: {
            id:{
                type: mongoose.Schema.Types.ObjectId,
                 ref: "User"
            },
            fullname: String
        }, 

        comments:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref:"Comments"
            }
        ],
        created:{
            type: Date,
            default:Date.now
        }
        

    })

    module.exports = mongoose.model("Post", postSchema );