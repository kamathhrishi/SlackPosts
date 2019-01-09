

const mongoose=require('mongoose');

const Schema=mongoose.Schema;

var PostsSchema=new Schema({

     User:String,
     UserTitle:String,
     title:String,
     content:String,
     date:{type:Date,default:Date.now}

});


var posts=module.exports.posts=mongoose.model('posts',PostsSchema);

module.exports=posts;

module.exports.AddPost=function(user,callback){


        posts.create(user,callback);


}

module.exports.GetPosts=function(callback){


        posts.find({},callback);


}
