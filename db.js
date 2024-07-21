const mongoose = require('mongoose');
require('dotenv').config();

const mongoURL = "mongodb://localhost:27017/voting";

mongoose.connect(mongoURL);

const db = mongoose.connection;

db.on('connected',()=>{
  console.log('connected to mongodb server')
});

db.on('error',(err)=>{
  console.log('MongoDB connection error',err)
});
db.on('disconnected',()=>{
  console.log('MongoDB disconnected')
});

module.exports = db;