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
	db.collection('chatroom').findOne({username:username,password:password}, function(err, users) {
    if( !err && users && password === req.query.password ) {
 mongoose.model('chatroom').find({"username":{"$nin":[username]}},function(err,others){
	 mongoose.model('messages').find({username:username},function(err,posts){

 res.render('user',{ fromuser:username,users:others ,posts:posts});
	 });
	});
 }
       
    else { res.render('login',{error:"Incorrect Username and Password"}); }

});
	
});





module.exports = router;
