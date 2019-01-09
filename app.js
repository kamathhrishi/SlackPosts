
//Import required dependencies
const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');

const Database_Connection='mongodb://localhost:27017/BLOG';

//Port from which the application will run
const PORT=3000;

//Connect to MongoDB Database
mongoose.connect(Database_Connection, {useNewUrlParser: true});

//MongoDB Database Collections retrived by mongoose
users=require('./Models/Users');
Posts=require('./Models/Posts');

//Express Object with EJS view view engine
var app=express();
app.set('view engine','ejs');

app.use('/img',express.static('img'));

//Check whether user has logged in
var Login=false;

//Get details of logged in user
var LoggedInUser=false;

//Body parser for getting form submission data
var urlencodedParser = bodyParser.urlencoded({ extended: false });

//Default view rendered
app.get('/',function(req,res){


      res.render('Index',{Error_Message:""});


});

app.get('/Register',function(req,res){


      res.render('Register',{Error_Message:""});


});

//Post request that saves users information onto a database
app.post('/AddUser',urlencodedParser,function(req,res){


  if(req.body.username.length>5){

      if(req.body.pswd.length>7){

        if(req.body.pswd==req.body.pswda){

          users.AddUser({UserName:req.body.username,password:req.body.pswd,title:req.body.title},function(err,user){

                if(err){

                    throw err;

                }

                res.render('Index',{Error_Message:""})

         });

      }
      else{

          res.render('Register',{Error_Message:"Passwords do not match"});

      }
    }
    else{

         res.render('Register',{Error_Message:"Password length should be above 7"});

    }

  }
  else{

        res.render('Register',{Error_Message:"User name length should be above 5"});


  }

});

//Post request which checks if given UserName and password combination exists
app.post('/Login',urlencodedParser,function(req,res){

  Dash_posts=[];

  users.findOne({UserName:req.body.login_user,password:req.body.login_pwd},function(err,user_valid){

            if(err){

                throw err;

            }

            if(user_valid){
            console.log("Logged in?");

            Posts.find({}).then(function(posts){


                  console.log(user_valid);
                  LoggedInUser=user_valid;
                  Login=true;
                  res.render('Dash',{Dash_Posts:posts,UserName:req.body.login_user});


            })
          }
          else{

                 res.render('Index',{Error_Message:"Invalid login Credentials!"});

          }

  });


});

//Renders view which allows users to create an post
app.get('/CreatePost',function(req,res){

  if(Login==true){

        res.render('CreatePost',{Error_Message:"You must first login to view this page"});

  }

  else{

        res.render('Index',{Error_Message:"You must first login to view this page"});
        alert("You must first login");

  }

});

app.get('/Logout',function(req,res){


        Login=false;
        LoggedInUser=null;


        res.render('Index',{Error_Message:""});



});

//Renders a spefic blogpost from database when a specified blogpost is clicked
app.get('/UserPost',function(req,res){

  if(Login==true){

    if(req.query){

       Posts.find(req.query).then(function(posts){

             console.log("Found it! YASS");
             res.render('BlogPost',{Post_Title:posts[0].title,Post_Content:posts[0].content,User:posts[0].User,UserTitle:posts[0].UserTitle,date:posts[0].date});

       });

    }

   }

 else{

   res.render('Index',{Error_Message:"You must first login to view this page"});
   alert("You must first login");

 }


});

//Post request made when user submits a blogpost
app.post('/CreatePost',urlencodedParser,function(req,res){

if(Login==true){

  if(req.body.post_body.length>30){

    if(5<req.body.post_title.length<20){
     Posts.AddPost({User:LoggedInUser.UserName,UserTitle:LoggedInUser.title,title:req.body.post_title,content:req.body.post_body},function(err,post){

            if(err){

                throw err;

            }
            console.log(LoggedInUser);
            Posts.find({}).then(function(posts){

                  res.render('Dash',{Dash_Posts:posts,UserName:LoggedInUser.UserName});

            })


    });
    }
    else{

           res.render('CreatePost',{Error_Message:"Your post title must be less than 15 charecters and more than 5 charecters"});

    }
  }
   else{

         res.render('CreatePost',{Error_Message:"Your post length must be more than 30 charecters"});

  }
}

else{

  res.render('Index',{Error_Message:"You must first login to view this page"});
  alert("You must first login");

}
});

//Renders all posts view

app.get('/Posts',function(req,res){

           if(Login==true){

               Posts.find({}).then(function(posts){

                     res.render('Dash',{Dash_Posts:posts,UserName:LoggedInUser[0].UserName});

               });

             }
             else{

               res.render('Index',{Error_Message:"You must first login to view this page"});
               alert("You must first login");

             }

});


app.listen(PORT);
