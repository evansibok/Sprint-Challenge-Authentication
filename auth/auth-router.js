const router = require('express').Router();
const bcrypt = require('bcryptjs');

const UsersDb = require('../users/users-model');
const validateUser = require('../middlewares/validateUser');

router.post('/register', validateUser, (req, res) => {
  // implement registration
  let { username, password } = req.body;
  const hash = bcrypt.hashSync(password, 10);

  UsersDb.addUser({ username, password: hash })
    .then(savedUser => {
      res.status(201).json(savedUser);
    })
    .catch(err => {
      res.status(500).json({
        errorMessage: "Account creation failed!",
        stack: err.stack,
      })
    });

});

router.post('/login', validateUser, (req, res) => {
  // implement login
  let 
});



module.exports = router;
