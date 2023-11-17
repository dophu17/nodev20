const express = require('express');
const router = express.Router();

var users = [
	{id: 1, name: "User1", email: "user1@gmail.com", age: 31}, 
	{id: 2, name: "User2", email: "user2@gmail.com", age: 20},
	{id: 3, name: "User3", email: "user3@gmail.com", age: 25}
];

router.get('/', function(req, res){
	res.send({
		users: users
	});
})

router.get('/search', (req,res) => {
	var name_search = req.query.name
	var result = users.filter( (user) => {
		return user.name.toLowerCase().indexOf(name_search.toLowerCase()) !== -1
	})

	res.send({
		users: result
	});
})

router.get('/create', (req, res) => {
	res.send('users/create');
})

router.post('/create', (req, res) => {
	users.push(req.body);
	res.send({
		users: users
	})
})

router.get('/:id', (req, res) => {
	var user = users.find( (user) => {
		return user.id == parseInt(req.params.id);
	});
	res.send({
    	user: user
    })
})

module.exports = router