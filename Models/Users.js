

const mongoose=require('mongoose');

const Schema=mongoose.Schema;

var UserSchema=new Schema({

     UserName:String,
     password:String,
     title:String

});


var users=module.exports.users=mongoose.model('users',UserSchema);

module.exports.AddUser=function(user,callback){


        users.create(user,callback);


}

module.exports.GetUser=function(user,callback){


        users.find(user,callback);


}
