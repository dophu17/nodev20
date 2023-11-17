const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const verifyToken = require('./middleware/verifyToken')
const {login, logout} = require('./app/user/auth_router')
const userRouter = require('./app/user/user_router')
require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: false }));

// router module
app.use('/api/login', login)
app.use('/api/logout', logout)
app.use('/api/users', verifyToken, userRouter)

// public API
app.get('/api/public', (req, res) => {
  res.send('API public')
})

// private API
app.get('/api/admin', verifyToken, (req, res) => {
  try {
    res.send(req.user)
  } catch(err) {
    res.send(err.message)
  }
})

app.listen(3000);
console.log('Listening on http://localhost:3000');
