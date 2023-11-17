const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
require('dotenv').config();

const secret = process.env.SECRET

var login = router.post('/', (req, res) => {
	let loginData = {
		username: req.body.username,
		password: req.body.password,
	}

	var token = jwt.sign(loginData, secret, { expiresIn: '1d' });
	res.send({
		username: loginData.username,
		token: token,
		msg: 'Login function'
	})
})

var logout = router.get('/', (req, res) => {
	res.send('Logout function')
})

module.exports = {
	login: login,
	logout: logout
}