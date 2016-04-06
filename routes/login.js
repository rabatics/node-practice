var express = require('express');
var router = express.Router();
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
		console.log(u.friends);
    if( !err && u && password === req.query.password ) {
// mongoose.model('chatroom').find({"username":{"$in":[u.friends]}},function(err,others){
	 mongoose.model('messages').find({"username":username},function(err,posts){
	 	mongoose.model('chatroomgrp').find({"members":{"$elemMatch":{"username":username}}},function(err,groups){
console.log(groups);
 res.render('user',{ fromuser:username,users:u.friends ,posts:posts,groups:groups});
	 });
	});
 }
       
    else { res.render('login',{error:"Incorrect Username and Password"}); }

});
	
});





module.exports = router;





/*

db.chatroom.update({username:"rajesh"},{$pull:{friends:{$in:["abhilash"]}}})




*/