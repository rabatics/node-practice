var express = require('express');
var router = express.Router();
  var mongoose=require('mongoose');
var db=mongoose.connection;
/* GET home page. */
router.get('/', function(req, res, next) {
  var fromuser=req.query.from;
  res.render('find',{fromuser:fromuser});
});

router.get('/friend', function(req, res, next) {
	var email=req.query.email;
	var username=req.query.from;
	mongoose.model('chatroom').find({"email":email,"friends.username":{"$nin":[username]}}, function(err, user) {
    if( !err && user) {
   
  res.render('find',{ fromuser:username,friends:user});
 }
       
  else { 
    	res.render('find',{error:"No friends Found!",fromuser:fromuser});
    	 }

});
	
});



router.get('/addfriend', function(req, res, next) {
	var username=req.query.username;
	var fromuser=req.query.from;
	

	db.collection('requests').insert({"username":username,"from":fromuser});
   console.log("added");
  res.render('find',{ fromuser:fromuser,error:"A friend request has been sent to "+username});
 
 

	
});








module.exports = router;





/*

db.chatroom.update({username:"rajesh"},{$pull:{friends:{$in:["abhilash"]}}})


*/