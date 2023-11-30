const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('./user_model')
require('dotenv').config();

const secret = process.env.SECRET

var login = router.post('/', (req, res) => {
	let loginData = {
		username: req.body.username ?? '',
		password: req.body.password ?? '',
	}

	var token = jwt.sign(loginData, secret, { expiresIn: '1d' });

  User.updateTokenByUsername(loginData.username, token, (err, rows) => {
    res.send({
    	username: loginData.username,
      token: token,
      msg: 'Login function'
    });
  })
})

var logout = router.get('/', (req, res) => {
  let token = req.headers.token ?? ''
  let decoded = jwt.verify(token, process.env.SECRET);

  User.updateTokenByUsername(decoded.username, '', (err, rows) => {
    res.send({
    	username: '',
      token: '',
      msg: 'Logout function'
    });
  })
})

module.exports = {
	login: login,
	logout: logout
}