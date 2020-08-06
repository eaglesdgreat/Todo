const _ = require('lodash')
const User = require('./../models/users.model')
const Role = require('./../_helpers/role')

function createUser(req, res) {
  const user = new User(req.body)
  const isFirst = User.findOne({ role: 'Admin' })
  user.role = !isFirst ? Role.Admin : Role.User
  user.save((err, result) => {
    if (err) {
      return res.status(401).json({ error: `${err} cannot create account` })
    }
    return res.status(200).json({
      message: `Welcome ${result.name} your account is created`
    })
  })
}

function listUsers(req, res) {
  User.find((err, users) => {
    if (err) {
      return res.status(401).json({ error: err })
    }
    return res.status(200).json(users)
  }).select('name email role created updated')
}

function userById(req, res, next, id) {
  User.findById({ _id: id })
    .exec((err, user) => {
      if (err || !user) {
        return res.status(404).json({ error: err })
      }
      req.profile = user
      next()
      return req.profile
    })
}

function readUser(req, res) {
  const user = req.profile
  user.hashed_password = undefined
  user.salt = undefined
  return res.status(200).json(user)
}

function updateUser(req, res) {
  let user = req.profile
  const check = User.findOne({ role: Role.Admin || req.profile.role })
  if (!check) {
    return res.status(403).json({error: 'User not authorized'})
  }
  user = _.extend(user, req.body)
  user.updated = Date.now()
  user.save((err, result) => {
    if (err) {
      return res.status(401).json({ error: `${err} cannot update user data`})
    }
    result.hashed_password = undefined
    result.salt = undefined
    return res.status(200).json(result)
  })
}

function removeUser(req, res) {
  const user = req.profile
  const check = User.findOne({ role: Role.Admin || req.profile.role })
  if (!check) {
    return res.status(403).json({error: 'User not authorized'})
  }
  user.remove((err, user) => {
    if (err) {
      res.status(401).json({ error: `${err} cannot delete account`})
    }
    return res.status(200).json({
      message: 'Account deleted try creating new account'
    })
  })
}

module.exports = {
  createUser,
  listUsers,
  userById,
  readUser,
  updateUser,
  removeUser,
}