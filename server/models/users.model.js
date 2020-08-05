const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

// Creating model schemas
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'Name is requireed',
    trim: true,
  },
  role: {
    type: String,
    required: 'Role is required',
    trim: true,
  },
  email: {
    type: String,
    required: 'Email is requied',
    trim: true,
    unique: true,
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
  },
  hashed_password: {
    type: String,
    trim: true,
  },
  salt : { type: String, trim: true },
  created: {
    type: Date,
    default: Date.now,
  },
  updated: Date,
})

// creating a virtual field for password protection and authentication
UserSchema
  .virtual('password')
  .set(function (password) {
    this._password = password
    this.salt = this.makeSalt()
    this.hashed_password = this.encryptPassword(password)
  })
  .get(function () {
    return this._password
  })

// Defining Methods to authenticate and encrypt password
UserSchema.methods = {
  authenticate: function (plainText) {
    // const text = this.encryptPassword(plainText)
    // return bcrypt.compare(plainText, this.hashed_password, function (err, result) {
    //   if (err) { console.log(err) }
    //   return result
    // })
    return this.encryptPassword(plainText) === this.hashed_password
  },

  encryptPassword: function (password) {
    if (!password) return ''
    try {
      bcrypt.hash(password, 10, function () {
        return ''
      })
    } catch (err) {
      return err
    }
  },

  makeSalt: function () {
    return Math.round((new Date().valueOf() * Math.random())) + ''
  }
} 

// Adding validation to mongoose database 
UserSchema.path('hashed_password')
  .validate(function () {
    if (this._password && this._password.length < 7) {
      this.invalidate('password', 'Password must be at least 7 characters')
    }

    if (this.isNew && !this._password) {
      this.invalidate('password', 'Password is required')
    }
  })

  module.exports = mongoose.model('User', UserSchema)