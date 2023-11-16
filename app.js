const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const verifyToken = require('./middleware/verifyToken')
require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: false }));

var secret = process.env.SECRET

app.post('/api/login', (req, res) => {
  let loginData = {
    username: req.body.username,
    password: req.body.password,
  }

  var token = jwt.sign(loginData, secret, { expiresIn: '1d' });
  res.send({
    username: loginData.username,
    token: token,
  })
})

app.get('/api/admin', verifyToken, (req, res) => {
  try {
    res.send(req.user)
  } catch(err) {
    res.send(err.message)
  }
})

// app.use(function(err, req, res, next){
//   console.error(err.stack);
//   return res.set(err.headers).status(err.status).json({ message: err.message });
// });

app.listen(3000);
console.log('Listening on http://localhost:3000');
