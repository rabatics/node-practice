var express = require('express');
var router = express.Router();
  var mongoose=require('mongoose');
var db=mongoose.connection;
/* GET home page. */
router.get('/', function(req, res, next) {
  var fromuser=req.query.from;
  mongoose.model('requests').find({"username":fromuser},function(err,requests){


  res.render('find',{fromuser:fromuser,requests:requests});
});
  });



router.get('/create', function(req, res, next) {
	
	var username=req.query.from;
	db.collection('chatroom').findOne({"username":username},function(err,fromdoc){ 
 res.render('group',{fromuser:username,friends:fromdoc.friends});
  

});
    });
    
	




router.post('/creategrp', function(req, res, next) {
	var gname=req.body.gname;
	var fromuser=req.body.from;
  var grpfriends=req.body.mem;
  console.log(grpfriends);

var members=[{"username":fromuser}];
for(i=0;i<grpfriends.length;i++){
  members.push({"username":grpfriends[i]});
}	
 console.log(members);


	db.collection('chatroom').insert({"groupname":gname,"members":members},function(err,doc){
   console.log("added");
   
  res.render('group',{ fromuser:fromuser,error:"A group has been created with the name "+gname});
});
 
 

	
});








module.exports = router;





/*

db.chatroom.update({username:"rajesh"},{$pull:{friends:{$in:["abhilash"]}}})


*/