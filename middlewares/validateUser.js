function validateUser(req, res, next) {
  const user = req.body;

  if(Object.keys(user).length === 0) {
    res.status(400).json({ message: 'Invalid Credentials!' })
  } else if(user.username === "" || user.password === ""){
    res.status(400).json({ message: 'Please provide username or password' })
  } else {
    next();
  }
}

module.exports = validateUser;