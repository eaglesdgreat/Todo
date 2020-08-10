const express = require('express')

const User = require('../controllers/users.controller')
const List = require('../controllers/lists.controller')
const Auth = require('../controllers/auth.controller')

const router = express.Router()

router.route('/api/lists/:userId')
  .get(Auth.requiredSignIn, List.allListByUser)
  .post(Auth.requiredSignIn, List.createList)

router.route('/api/list/:listId')
  .get(Auth.requiredSignIn, List.getList)
  .put(Auth.requiredSignIn, List.isOwner, List.updateList)
  .delete(Auth.requiredSignIn, List.isOwner, List.removeList)

router.route('/api/list')
  .get(Auth.requiredSignIn, List.Lists)

router.route('api/list/new/task/:listId')
  .put(Auth.requiredSignIn, List.createTask)

router.route('/api/list/update/task/:listId')
  .put(Auth.requiredSignIn, List.isOwner, List.updateTask)

router.route('/api/list/delete/task/:listId')
  .put(Auth.requiredSignIn, List.isOwner, List.removeTask)

router.param('userId', User.userById)
router.param('listId', List.listById)

module.exports = router
