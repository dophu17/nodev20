const { check } = require('express-validator');

let validateRegister = () => {
  return [ 
    check('username', 'username does not Empty').not().isEmpty(),
    check('password', 'Invalid does not Empty').not().isEmpty(),
  ]; 
}

let validateLogin = () => {
  return [ 
    check('email', 'Invalid does not Empty').not().isEmpty(),
    check('password', 'Invalid does not Empty').not().isEmpty(),
  ]; 
}

let validate = {
  validateRegister: validateRegister,
  validateLogin: validateLogin
};

module.exports = { validate };