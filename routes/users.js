var express = require('express');
var router = express.Router();
var mongoose=require('mongoose');
var db=mongoose.connection;

var routes = require('./index');
//var users1 = require('../users');

/* GET users listing. */






router.get('/', function(req, res, next) {

   mongoose.model('chatroom').find({$nin:[fromuser]},function(err,users){
    	mongoose.model('messages').find(function(err,posts){
 			res.render('user',{ users:users,posts:posts });
    	});
   
});
});

router.get('/change',function(req, res, next) {
	var fromname=req.query.from;
var toname= req.query.name;
	 mongoose.model('messages').find({ $or: [ { "from": fromname ,"to":toname}, { "from": toname,"to":fromname } ] },function(err,posts){
    	mongoose.model('chatroom').find({"username":{"$nin":[fromname]}},function(err,users){
 			res.render('user',{ users:users,posts:posts,fromuser:fromname,to:toname });
    	});
   
});
});

router.post('/add', function(req, res, next) {
	var fromname=req.body.from;
var toname= req.body.to;
var contentnew= req.body.content;
var fromuser=db.collection('chatroom').findOne({"username":fromname});
	db.collection('messages').insert({"from":fromname,"to":toname,"content":contentnew});
		
			 mongoose.model('messages').find({ $or: [ { "from": fromname ,"to":toname}, { "from": toname,"to":fromname } ] },function(err,posts){
    	mongoose.model('chatroom').find({"username":{"$nin":[fromname]}},function(err,users){
 			res.render('user',{ users:users,posts:posts,fromuser:fromname,to:toname });
    	});
   
});
		
	});
   






module.exports = router;
