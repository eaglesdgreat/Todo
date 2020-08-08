const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')

const User = require('./../models/users.model')
const config = require('./../config')

function signIn(req, res) {
  // If user failed to enter email
  if (!req.body.email) {
    return res.status(401).json({ error: `Enter a valid Email`})
  }

  // To check if user enter a password
  if (!req.body.password) {
    return res.status(401).json({ error: 'Enter Email and Password to login'})
  }


  User.findOne({ email: req.body.email }, (err, user) => {
    // If error in finding user email
    if (err || user === null) {
      return res.status(401).json({ error: `Email not registered Or wrong email input`})
    }

    // Verify and validate password using authenticate method
    if(!user.authenticate(req.body.password)) {
      return res.status(401).json({ error: 'Email and Passowrd do not match'})
    }

    // generate token using jwt sign with id and secret key
    const token = jwt.sign({
      _id: user._id
    }, config.jwtSecret)

    // Store token and user data in Json
    return res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      }
    })
  })
}

// To validate the token in the incoming request on authorization header
// if token is valid it append the user Id in an auth key
// to the request object before allowing to access private data
const requiredSignIn = expressJwt({
  secret: config.jwtSecret,
  algorithms: ['HS256'],
  userProperty: 'auth',
})

// To check if the authenticated user is the same as the user being 
// updated and deleted and has authorization to the account being updated
// and deleted before allow CRUD to proceed
function hasAuthorization(req, res, next) {
  const authorized = req.profile && req.auth && req.profile._id == req.auth._id
  if (!authorized) {
    return res.status(403).json({ error: 'User is not authorized for this account'})
  }
  next()
  return authorized
}

module.exports = {
  signIn,
  requiredSignIn,
  hasAuthorization,
}