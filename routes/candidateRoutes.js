const express=require('express');
const router = express.Router();
const User = require('./../models/user');
const Candidate = require('./../models/candidate');
const {jwtAuthMiddleware,genrateToken} = require('./../jwt');

require('dotenv').config();


// function to verify that request is made by admin only
const checkAdminRole = async(userID)=>{
  try{
      const user = await User.findById(userID);
      return user.role==='Admin';
  }
  catch(err){
      return false;
  }
}

//Post route to add a candidate
router.post('/',jwtAuthMiddleware,async(req,res)=>{
  try{
    if(!await checkAdminRole(req.user.id)){
      return res.status(403).json({message:'user has not admin role '});
    }

     const data = req.body// assume request body contain the candidate data

     // create a new candidate document using mongoose model

     const newcandidate = new Candidate(data);

     // save the new user to the database

     const response = await newcandidate.save();
     console.log('data saved');

     res.status(200).json({response:response});
  }
  catch(err){
    console.log(err);
    res.status(500).json({error:'internal server error'}) 
  }
})


router.put('/:candidateID',jwtAuthMiddleware,async(req,res)=>{
    try{
    if(!await checkAdminRole(req.user.id)){
      return res.status(403).json({message:'user has not admin role '});
    }
    const candidateId = req.params.candidateID; // extract the userid from url parameter
    const updatedCandidateData = req.body; // updated data for the person

    const response = await Candidate.findByIdAndUpdate(candidateId,updatedCandidateData,{
      new:true,
      runValidators:true,
    });

    if(!response){
      res.status(404).json({error:'candidate not found'});
    }
   console.log('candidate data updated');
   res.status(200).json(response);
  }catch(err){
    console.log(err);
    res.status(500).json({error:'internal server error'});
  }
})

router.delete('/:candidateID',jwtAuthMiddleware,async(req,res)=>{
  try{
  if(!await checkAdminRole(req.user.id)){
    return res.status(403).json({message:'user has not admin role '});
  }
  const candidateId = req.params.candidateID; // extract the userid from url parameter
  

  const response = await Candidate.findByIdAndDelete(candidateId);

  if(!response){
    res.status(404).json({error:'candidate not found'});
  }
 console.log('candidate data deleted');
 res.status(200).json(response);
}catch(err){
  console.log(err);
  res.status(500).json({error:'internal server error'});
}
})
// let's start voting
router.post('/Vote/:candidateID',jwtAuthMiddleware,async (req,res) =>{
  // no admin can vote
  // user can vote only once
 const candidateID = req.params.candidateID;
 const userId = req.user.id;
 try{
  const candidate = await Candidate.findById(candidateID);
  if(!candidate){
    return res.status(404).json({message:'candidate not found'});
  }
  const user = await User.findById(userId);
  if(!user){
    return res.status(404).json({message:'user not found'});
  }

  if(user.isVoted){
    res.status(404).json({message:'you have already voted'});
  }
  if(user.role==='Admin'){
    res.status(403).json({message:'admin is not allowed'});
  }
    candidate.votes.push({user:userId});
    candidate.voteCount++;
    await candidate.save();

    //update the user document
    user.isVoted = true;
    await user.save();

    res.status(200).json({message:'Vote recorded successfully'});
 }catch(err){
   console.log(err);
   res.status(500).json({error:'Internal Server Error'});
 }
});

// vote count
router.get('/vote/count',async(req,res)=>{
  try{
    // find all the candidates and sort them by votecount in descending order
     const candidate = await Candidate.find().sort({voteCount:'desc'});

     // map the candidates abd only return their name and votecount

     const voteRecord = candidate.map((data)=>{
       return{
        party: data.party,
        count:DataTransfer.voteCount
       }
     });
    return res.status(200).json(voteRecord);
  }
  catch(err){
   console.log(err);
   res.status(500).json({error:'Internal Server Error'});

  }
})
module.exports = router;
