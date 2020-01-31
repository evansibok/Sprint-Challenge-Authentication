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
  const { username, password } = req.body;

  UsersDb.findBy({ username })
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        res.status(200).json({ 
          message: `Welcome ${user.username}!`,
         });
      } else {
        res.status(404).json({
          message: "You shall not pass!"
        })
      }
    })
    .catch(err => {
      res.status(500).json({
        errorMessage: err.message,
        stack: err.stack,
      })
    });
});



module.exports = router;
