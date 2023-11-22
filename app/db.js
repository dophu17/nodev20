const mysql = require('mysql')

const db = mysql.createConnection({
	host     : process.env.DB_HOST,
	port     : process.env.DB_PORT,
	user     : process.env.DB_USER,
	password : process.env.DB_PASSWORD,
	database : process.env.DB_DATABASE
});

db.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

module.exports = db;