require('dotenv').config();

const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const validateUser = require('../middlewares/validateUser');
const UsersDb = require('../users/users-model');

function makeToken(user) {
  const payload = {
    sub: user.id,
    username: user.username, // Optional but could be useful for frontend
  };

  const options = {
    expiresIn: '1d',
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, options);
  return token;
}

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
        const token = makeToken(user);
        res.status(200).json({
        message: `Welcome ${user.username}!`,
          token
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
