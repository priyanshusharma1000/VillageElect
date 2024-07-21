const express = require('express')
const app = express();
const db = require('./db');
require('dotenv').config();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;
const {jwtAuthMiddleware} = require('./jwt');
// import routes files
const userRoutes = require('./routes/userRoutes');
const candidateRoutes = require('./routes/candidateRoutes');

app.use('/user',userRoutes);
app.use('/candidate',candidateRoutes);// jo bhi user isko perform karega uska role admin hona chahiye


app.listen(PORT,()=>{
  console.log('listening on port 3000')
})

