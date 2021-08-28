const express = require('express');

const mongoose = require('mongoose');

const userRoutes = require('./routes/user');


const app = express();

const uri = 'mongodb+srv://leo:bTAwRpWUFeJsSe2i@cluster0.7qqsb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

try {
  mongoose.connect( uri, {useNewUrlParser: true, useUnifiedTopology: true}, () =>
  console.log("connected"));    
  }catch (error) { 
  console.log("could not connect");    
  }

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});


app.use(express.json());

app.use('/api/user', userRoutes);


module.exports = app;