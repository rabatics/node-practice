var express = require('express');
var router = express.Router();
var mongoose=require('mongoose');
var db=mongoose.connection;

var routes = require('./index');
//var users1 = require('../users');

/* GET users listing. */






router.get('/', function(req, res, next) {
	var fromuser=req.query.from;
	db.collection('chatroom').findOne({"username":fromuser},function(err,fromdoc){
 
    	mongoose.model('messages').find({"$or":[{"from":fromuser},{"to":fromuser}]},function(err,posts){
 			res.render('user',{ fromuser:fromuser,users:fromdoc.friends,posts:posts });
    	});
   
});
   });


router.get('/change',function(req, res, next) {
	var fromname=req.query.from;
var toname= req.query.name;
db.collection('chatroom').findOne({"username":fromname},function(err,fromdoc){ 
	 mongoose.model('messages').find({ $or: [ { "from": fromname ,"to":toname}, { "from": toname,"to":fromname } ] },function(err,posts){
    	
 			res.render('user',{ users:fromdoc.friends,posts:posts,fromuser:fromname,to:toname });
    	});
   
});
	  });


router.post('/add', function(req, res, next) {
	var fromname=req.body.from;
var toname= req.body.to;
var contentnew= req.body.content;
db.collection('chatroom').findOne({"username":fromname},function(err,fromdoc){ 
	db.collection('messages').insert({"from":fromname,"to":toname,"content":contentnew});
		
			 mongoose.model('messages').find({ $or: [ { "from": fromname ,"to":toname}, { "from": toname,"to":fromname } ] },function(err,posts){
    	 
 			res.render('user',{ users:fromdoc.friends,posts:posts,fromuser:fromname,to:toname });
    	});
   
});
	});	
	
   

   router.get('/getData', function(req, res, next) {
   	res.send({txt:"2016",data:"23,45,67,89,12,34,45,64,23,45,67,45"});

		
	});

  router.post('/postData', function(req, res, next) {
   	res.send({txt:"2016",data:"23,45,67,89,12,34,45,64,23,45,67,45"});

		
	});





module.exports = router;
