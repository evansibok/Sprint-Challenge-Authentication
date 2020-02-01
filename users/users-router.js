const router = require('express').Router();

const UsersDb = require('./users-model');

router.get('/', (req, res) => {
  
  UsersDb.getUsers()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(err => {
      res.status(404).json({
        errorMessage: "Could not get users",
        stack: err.stack,
      })
    })
})

module.exports = router;