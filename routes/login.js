var express = require('express');
var router = express.Router();
//var session=require('client-sessions');
  var mongoose=require('mongoose');

var db=mongoose.connection;
/* GET home page. */
router.get('/', function(req, res, next) {
  
  res.render('login');
});

router.get('/login', function(req, res, next) {
	var username=req.query.username;
	var password=req.query.password;

	db.collection('chatroom').findOne({"username":username,"password":password}, function(err, u) {
		
    if( !err && u && password === req.query.password ) {
    	console.log(u.friends);
// mongoose.model('chatroom').find({"username":{"$in":[u.friends]}},function(err,others){
	 mongoose.model('messages').find({"username":username},function(err,posts){
	 	mongoose.model('chatroomgrp').find({"members":{"$elemMatch":{"username":username}}},function(err,groups){
console.log(groups);
req.session.user=username;
 res.render('user',{ fromuser:username,users:u.friends ,posts:posts,groups:groups});
	 });
	});
 }
       
    else { res.render('login',{error:"Incorrect Username and Password"}); }

});
	
});

router.get('/logout',function(req,res,next){
var username=req.query.from;
if(req.session.user || req.session.user==username){
	delete req.session.user;
    res.redirect('/userLogin');
  }
  else{
  	 res.redirect('/userLogin');
  }

});

router.get('/register',function(req,res,next){


  
  	 res.render('register');
  

});


router.post('/registeruser',function(req,res,next){
var username=req.body.username;
var password=req.body.password;
var confpwd=req.body.passwordconf;
var email=req.body.email;

if(email!=null && password===confpwd){
	mongoose.model('chatroom').findOne({"username":username},function(err,fromdoc){
		if(fromdoc!=null){
			 res.render('register',{error:"The username is  already in use...... Please try another username!"});
		}
		else{
			db.collection('chatroom').insert({"username":username,"password":password,"email":email});
			res.render('register',{error:"Your account has been created! Please click the Login button to go to the Login Page"});
		}
	})
}

  
  	// res.render('register');
  

});


module.exports = router;





/*

db.chatroom.update({username:"rajesh"},{$pull:{friends:{$in:["abhilash"]}}})




*/