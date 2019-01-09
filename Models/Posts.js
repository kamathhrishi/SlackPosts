
//Import required dependency
const mongoose=require('mongoose');


//Define Schema of Posts
const Schema=mongoose.Schema;
var PostsSchema=new Schema({

     User:String,
     UserTitle:String,
     title:String,
     content:String,
     date:{type:Date,default:Date.now}

});

//Mongoose Instance to allow communication with MongoDB collection posts
var posts=module.exports.posts=mongoose.model('posts',PostsSchema);
module.exports=posts;

//function to add posts to Database
module.exports.AddPost=function(user,callback){

        posts.create(user,callback);

}

//function to get posts from Database
module.exports.GetPosts=function(callback){


        posts.find({},callback);


}
