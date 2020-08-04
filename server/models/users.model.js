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
    trime: true,
  },
  hashed_password: {
    type: String,
    trim: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  update: Date,
})

// creating a virtual field for password protection and authentication
UserSchema
  .virtual('password')
  .set(function (password) {
    this._password = password
    this.hashed_password = this.encryptPasssword(password)
  })
  .get(function () {
    return this._password
  })

// Defining Methods to authenticate and encrypt password
UserSchema.method = {
  authenticate: function (plainText) {
    return bcrypt.compare(plainText, this.hashed_password, function (err, result) {
      if (err) { console.log(err) }
      return result
    })
  },

  encryptPasssword: function (password) {
    if (!password) return ''
    try {
      bcrypt.hash(password, 10, function () {
        console.log('Done')
      })
    } catch (err) {
      return err
    }
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
