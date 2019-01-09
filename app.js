
const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');

const Database_Connection='mongodb://localhost:27017/BLOG';
const PORT=3000;

mongoose.connect(Database_Connection, {useNewUrlParser: true});
users=require('./Models/Users');
Posts=require('./Models/Posts');

var app=express();
app.set('view engine','ejs');

var urlencodedParser = bodyParser.urlencoded({ extended: false });


app.get('/',function(req,res){


      res.render('Index');


});

app.post('/AddUser',urlencodedParser,function(req,res){

  users.AddUser({UserName:req.body.username,password:req.body.pswd,title:req.body.title},function(err,user){

             if(err){


                throw err;


             }


  });


});

app.post('/Login',urlencodedParser,function(req,res){

  Dash_posts=[];
  users.GetUser({UserName:req.body.login_user,password:req.body.login_pwd},function(err,user){

            if(err){

                throw err;


            }

               Posts.find({}).then(function(posts){


                     res.render('Dash',{Dash_Posts:posts});

               })



  });

});

app.get('/CreatePost',function(req,res){


  res.render('CreatePost');


});

app.get('/Posts',function(req,res){

    Posts.find(req.query).then(function(posts){

             console.log("Found it! YASS");
             res.render('BlogPost',{Post_Title:posts[0].title,Post_Content:posts[0].content});


    });

});

app.post('/CreatePost',urlencodedParser,function(req,res){


  console.log(req.body);
  Posts.AddPost({User:"LOL",UserTitle:req.body.post_title,title:req.body.post_title,content:req.body.post_body},function(err,post){

            if(err){

                throw err;


            }
            Posts.find({}).then(function(posts){


                  res.render('Dash',{Dash_Posts:posts});

            })


  });

});

app.get('/Posts',function(req,res){


               Dash_posts=[];

               Posts.find({}).then(function(posts){


                     Dash_posts.push(posts);
                     res.render('Posts',{Dash_Posts:Dash_posts});

               })



});



app.listen(PORT);
