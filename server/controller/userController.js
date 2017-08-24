var modelUser = require('../models/user')
var jwt =  require('jsonwebtoken')
var helper = require('../helper/helper')
require('dotenv').config()

var createUser = function(req, res){
  user = new modelUser();
  user.username = req.body.username
  user.password = req.body.password
  user.email = req.body.email
  user.role = 'user'
  user.createdAt = new Date()
  user.updatedAt = new Date()

  let salt = helper.randomValueHex(12);
  user.password = helper.cryptoGraph(user.password, salt)
  user.salt = salt


  user.save(function(err){
    if(!err){
      res.send(user)
    }
    else {
      res.send(err)
    }
  })
}

var signinUser = function(req, res){
  if(!req.body.username || !req.body.password)
  {
    res.send('Enter the fields please')
  }
  else {
    modelUser.findOne({
      username:req.body.username
    })
    .then(data=>{
      console.log("=x=x=x>",data);
      // let salt = helper.randomValueHex(12);
      req.body.password = helper.cryptoGraph(req.body.password, data.salt)
      console.log("CUKKKK",req.body.password);
      if(data.password == req.body.password)
      {
        var token = jwt.sign({
          _id:data.id,
          username:req.body.username,
          role:data.role
        }, process.env.SECRETKEY);
        console.log("===>", token);
        res.send(token)
      }
    })
  }
}

var readUser = function(req, res){
  modelUser.find(function(err, data){
    if(!err){
      res.send(data)
    }
    else{
      res.send(err)
    }
  })
}

var updateUser = function(req, res){
  modelUser.findByIdAndUpdate({
    _id:req.params.id
  },{
    username: req.body.username,
    password: req.body.password,
    emai: req.body.email,
    createdAt: new Date(),
    updatedAt: new Date()
  })
  .then(date=>{
    res.send(data)
  })
  .catch(err=>{
    res.send(err)
  })
}

var deleteuser = function(req, res){
  modelUser.findByIdAndRemove({
    _id:req.params.id
  })
  .then(()=>{
    res.send('data deleted')
  })
  .catch(err=>{
    res.send(err)
  })
}

module.exports = {
  createUser,
  readUser,
  updateUser,
  deleteuser,
  signinUser
}
