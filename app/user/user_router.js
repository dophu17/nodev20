const express = require('express')
const router = express.Router()
const User = require('./user_model')

router.get('/', function(req, res){
  let username = req.query.username ?? ''
  User.getAll(username, (err, rows) => {
    res.send({
    	users: rows
    });
  })
})

router.get('/:id', (req, res) => {
  let id = parseInt(req.params.id) ?? ''
	User.findById(id, (err, rows) => {
    res.send({
    	users: rows
    });
  })
})

router.post('/create', (req, res) => {
  let body = req.body ?? ''
	User.create(body, (err, rows) => {
    res.send({
    	users: rows
    });
  })
})

router.put('/update/:id', (req, res) => {
  let id = parseInt(req.params.id) ?? ''
  let body = {
    username: req.body.username ?? '',
    password: req.body.password ?? ''
  }
	User.updateById(id, body, (err, rows) => {
    res.send({
    	users: rows
    });
  })
})

router.delete('/delete/:id', (req, res) => {
  let id = parseInt(req.params.id) ?? ''
	User.deleteById(id, (err, rows) => {
    res.send({
    	users: rows
    });
  })
})

module.exports = router