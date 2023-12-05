const express = require('express')
const router = express.Router()
const User = require('./user_model')

router.get('/', (req, res) => {
  var username = req.query.username ?? ''
  var pageNumber = req.query.page ?? 1
  var perPage = req.query.perPage ?? 10
  User.getAll(username, pageNumber, perPage, (err, rows) => {
    res.send({
    	users: rows.users,
      pages: rows.pages
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