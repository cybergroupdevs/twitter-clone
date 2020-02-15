const mongoose = require("mongoose");
const Joi = require('joi');

const signupSchema = mongoose.Schema({
  userhandle: {
    type: String,
    required: true,
    unique: true
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
  joined: {
    type: Date,
    default: Date.now()
  },
  dob: {
    type: Date
  }
});

// userSchema.methods.authenticate (To be done later) 

const User = mongoose.model("User", signupSchema);

function validateUser(user){
    for(let key in user){
      user[key] = user[key].trim();
    }

    const schema = {
        userhandle: Joi.string().min(3).max(50).required(),
        email: Joi.string().min(5).max(200).required(),
        password: Joi.string().min(5).max(255).required(),
        name: Joi.string().min(2).max(100).required(),
        mobile: Joi.string().min(8).max(20),
        dob: Joi.string().min(4).max(20).required()
    }
    console.log('user mil gaya signup schema mein', user, 'Joi.validate', Joi.validate(user, schema));

    return Joi.validate(user, schema);
}

module.exports.User = User;
module.exports.validateUser = validateUser;