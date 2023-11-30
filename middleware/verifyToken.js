const jwt = require("jsonwebtoken");
const User = require('../app/user/user_model')

module.exports = (req, res, next) => {
  try {
    var token = req.headers.token
    if (!token) return res.status(403).send("Access denied.");

    var decoded = jwt.verify(token, process.env.SECRET);

    User.findByUsername(decoded.username, (err, rows) => {
      if (rows.token != token) {
        res.status(400).send("Invalid token");
      } else {
        req.user = decoded;
        next();
      }
    })
  } catch (error) {
    res.status(400).send("Invalid token");
  }
};