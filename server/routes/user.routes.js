const express = require('express')

// Setting up  express router
const router = express.Router()

// Defining End Points
router.route('/api/users')
  .get()
  .post()

router.route('/api/users/:userId')
  .get()
  .put()
  .delete()

router.param('userId')

module.exports = router
