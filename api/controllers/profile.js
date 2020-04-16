const { User } = require('../models/signup');
const express = require('express');
const router = express.Router();  //it will append the index.js route with this
const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    userhandle: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    phoneNo: {
      type: String
    },
    profileImg: String,
    joined: {
     
    },
    dob: {
    
    },
     followerCount : {
      type : Number,
      default : 0
    },
    followingCount : {
      type : Number,
      default : 0
  },
    tweetCount: {
      type: Number,
      default: 0
    }
  });

 const userModel = mongoose.model('UserDetails', userSchema);

router.get('/', async (req, res) => {
    
    const userDetails = await userModel.find();
    
    res.send(userDetails);
});

router.get('/:id', async (req, res) => {
    try {
        const userDetails = await userModel.findOne({_id: req.params.id});
        res.send(userDetails);
    } 
    catch (error) {
        console.log(error);
    }
});

router.put('/', async (req, res) => {
    
    const userDetails = await userModel.update(req.body);
    
    res.send(userDetails);
});

router.patch('/', async (req, res) => {
    
    const userDetails = await userModel.update(req.body);
    
    res.send(userDetails);
});

router.post('/', async (req, res) => {
    const users = await User.findOne({userhandle: req.body.userhandle});
    res.send(users);
});


module.exports = router;
