const router = require('express').Router();

const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const jokesRouter = require('../jokes/jokes-router.js');
const usersRouter = require('../users/users-router');

router.use('/auth', authRouter);
router.use('/jokes', authenticate, jokesRouter);
router.use('/users', authenticate, usersRouter);

router.get('/', (req, res) => {
  res.json('API is live!')
})

module.exports = router;