const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
//define schema
const userSchema = new mongoose.Schema({
   name: {
    type:String,
    required:true
   },
   age:{
    type:Number,
    required:true
   },
   email:{
    type:String,
    unique:true,
   },
   mobile:{
    type:String,
   },
   address:{
    type:String,
    required:true
   },
   aadharCardNumber:{
     type:Number,
     required:true,
     unique:true
   },
   password:{
    required:true,
    type:String,
    unique:true
   },
   role:{
    type:String,
    enum: ['Voter','Admin'],
    default:'Voter'
   },
   isVoted:{
    type:Boolean,
    default:false
   }
});


userSchema.pre('save',async function(next){
  const person  = this;
  // hash the password only if ith has been modified(or it is new)
  if(!person.isModified('password')) return next();
  try{
    // hash password genration
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(person.password,salt);
    //override the plain password with the hashed one
    person.password = hashedpassword;
    next();
    // next moongoose ko ye btata he ke hamne aapna kaam kar liya ab tum tumhara kar lo
  }catch(err){
     return next(err);
  }

});


userSchema.methods.comparePassword = async function(candidatePassword){
  try{
   // use bcrypt to compare the provided password with the hashed password
   const isMatch = await bcrypt.compare(candidatePassword,this.password);
   return isMatch;
  }
  catch(err){
    throw err;
  }
}
const user = mongoose.model('user',userSchema);
module.exports = user;
 