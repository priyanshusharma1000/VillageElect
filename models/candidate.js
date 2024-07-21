const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
//define schema
const candidateSchema = new mongoose.Schema({
   name: {
    type:String,
    required:true
   },
   party:{
    type:String,
    required:true
   },
   age:{
    type:Number,
    required:true
   },
   votes:[  //votes is a array of js object user and votedAt
      {
         user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true
         },
         votedAt:{
           type:Date,
           default:Date.now()
         }

      }
   ],
   voteCount:{
      type:Number,
      default:0
   }
});

const candidate = mongoose.model('candidate',candidateSchema);

module.exports = candidate;