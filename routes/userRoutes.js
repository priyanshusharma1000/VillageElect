const express=require('express');
const router = express.Router();
const User = require('./../models/user');
const {jwtAuthMiddleware,genrateToken} = require('./../jwt');

router.post('/signup', async (req, res) =>{
  try{
      const data = req.body // Assuming the request body contains the User data

      // Check if there is already an admin user
      const adminUser = await User.findOne({ role: 'admin' });
      if (data.role === 'admin' && adminUser) {
          return res.status(400).json({ error: 'Admin user already exists' });
      }

     

      // Check if a user with the same Aadhar Card Number already exists
      const existingUser = await User.findOne({ aadharCardNumber: data.aadharCardNumber });
      if (existingUser) {
          return res.status(400).json({ error: 'User with the same Aadhar Card Number already exists' });
      }

      // Create a new User document using the Mongoose model
      const newUser = new User(data);

      // Save the new user to the database
      const response = await newUser.save();
      console.log('data saved');

      const payload = {
          id: response.id
      }
      console.log(JSON.stringify(payload));
      const token = generateToken(payload);

      res.status(200).json({response: response, token: token});
  }
  catch(err){
      console.log(err);
      res.status(500).json({error: 'Internal Server Error'});
  }
})

// login route
router.post('/login',async (req,res)=>{
  try{
    // extract usrname and password
    const {aadharCardNumber,password} = req.body;

    const user = await User.findOne({aadharCardNumber:aadharCardNumber});

    if(!user || !user.comparePassword(password)){
      return res.status(401).json({error:'invalid username or password'});
    }

    // user bhi sahi h password sahi h ab token genrate karte h 
    const payload = {
      id:user.id,
    }
    const token = genrateToken(payload);
    // return token as response
    res.json({token});

  }catch(err){
     console.error(err);
     res.status(500).json({error:'internal server error'});
  }
});
// profile routes
router.get('/profile',jwtAuthMiddleware,async(req,res)=>{
  try{
     const userData = req.user;
     const userId = userData.id;
     const user = await User.findById(userId);
     res.status(200).json({user});
  }
  catch(err){
    console.error(err);
    res.status(500).json({error:'Internal server error'});
  }
})
router.put('/profile/password',jwtAuthMiddleware,async(req,res)=>{
  try{
    const userId = req.user.id; // extract the userid from token
    const {currentPassword,newPassword} = req.body;// extract current and new passwords from request body

   // finduser by userid
   const user = await User.findById(userId);

  // if password doesnt match return error
   if(!user.comparePassword(currentPassword)){
    return res.status(401).json({error:'invalid username or password'});
  }
  
  //  update the user's password
  user.password = newPassword;
  await user.save();
  console.log('password updated');
  res.status(200).json({message:"password updated"});
  }catch(err){
    console.log(err);
    res.status(500).json({error:'internal server error'});
  }
})



module.exports=router;