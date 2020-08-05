const express = require('express')

const User = require('./../controllers/users.controller')
const Auth = require('./../controllers/auth.controller')

// Setting up  express router
const router = express.Router()

// Defining EndPoints
router.route('/api/users')
  .get(User.listUsers)
  .post(User.createUser)

router.route('/api/user/:userId')
  .get(Auth.requiredSignIn, User.readUser)
  .put(Auth.requiredSignIn, Auth.hasAuthorization, User.updateUser)
  .delete(Auth.requiredSignIn, Auth.hasAuthorization, User.removeUser)

router.route('/api/auth/signin')
  .post(Auth.signIn)

router.param('userId', User.userById)

module.exports = router
