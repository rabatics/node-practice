var express = require('express');
var router = express.Router();
var mongoose=require('mongoose');
var db=mongoose.connection;

var routes = require('./index');
//var users1 = require('../users');

/* GET users listing. */






router.get('/', function(req, res, next) {
    mongoose.model('users').find(function(err,users){
    	mongoose.model('posts').find(function(err,posts){
 			res.render('user',{ users:users,posts:posts });
    	});
   
});
});



router.post('/add', function(req, res, next) {
	
var newname= req.body.name;
var contentnew= req.body.content;
	db.collection('posts').insert({"name":newname,"content":contentnew});
		
			 mongoose.model('users').find(function(err,users){
    	mongoose.model('posts').find(function(err,posts){
 			res.render('user',{ users:users,posts:posts });
    	});
   
});
		
	});
   






module.exports = router;
