
//Import required dependencies
const mongoose=require('mongoose');

//Define schema of users collection
const Schema=mongoose.Schema;
var UserSchema=new Schema({

     UserName:String,
     password:String,
     title:String

});


//Mongoose Instance to allow communication with MongoDB collection posts
var users=module.exports.users=mongoose.model('users',UserSchema);
module.exports=users;

//function to add users to Database
module.exports.AddUser=function(user,callback){

        users.create(user,callback);

}
