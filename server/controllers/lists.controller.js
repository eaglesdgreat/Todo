const _ = require('lodash')

const List = require('../models/lists.model')
const User = require('./../models/users.model')
const Role = require('./../_helpers/role')

function createList(req, res) {
  const list = new List(req.body)
  list.createdBy = req.profile
  list.save((err, result) => {
    if (err) {
      return res.status(401).json({ error: `${err} you can't create your account`})
    }
    return  res.status(200).json({
      message: `New list ${result.name} was created`
    })
  })
}

function Lists(req, res) {
  List.find((err, lists) => {
    if (err) {
      return res.status(401).json({ error: `${err} data missing`})
    }
    return res.status(200).json(lists)
  })
    .select('name description created updated createdBy')
}

function listById(req, res, next, id) {
  List.findById({ _id: id })
    .exec((err, list) => {
      if (err || !list) {
        return res.status(401).json({ error: err})
      }
      req.wall = list
      next()
      return req.wall
    })
}

function allListByUser(req, res) {
  List.find({ createdBy: req.profile._id })
  .populate('tasks.createdBy', '_id name')
  .populate('createdBy', '_id name')
  .sort('-created')
  .exec((err, lists) => {
    if (err) {
      return res.status(401).json({ error: err })
    }
    return res.status(200).json(lists)
  })
}

function getList(req, res) {
  const list = req.wall
  return res.status(200).json(list)
}

function updateList(req, res) {
  let list = req.wall
  const check = User.findOne({ role: Role.Admin || req.profile.role })
  if (!check) {
    return res.status(403).json({error: 'User not authorized'})
  }
  list = _.extend(list, req.body)
  list.updated = Date.now()
  list.save((err, result) => {
    if (err) {
      return res.status(401).json({ error: `${err} cannot update list`})
    }
    return res.status(200).json(result)
  })
}

function removeList(req, res) {
  const list = req.wall
  const check = User.findOne({ role: Role.Admin || req.profile.role })
  if (!check) {
    return res.status(403).json({error: 'User not authorized'})
  }
  list.remove((err, list) => {
    if (err) {
      res.status(401).json({ error: `${err} cannot delete list`})
    }
    return res.status(200).json({
      message: 'List deleted for your todos'
    })
  })
}

function isOwner(req, res, next) {
  const owner = req.wall && req.auth && req.wall.createdBy._id == req.auth._id
  if (!owner) {
    return res.status(403).json({error: 'User not authorized'})
  }
  next()
}

function createTask(req, res) {
  console.log(req.body)
  let task = req.body.task
  task.createdBy = req.body.userId
  List.findByIdAndUpdate(req.wall._id, { $push: { tasks: task } }, { new: true } )
    .populate('tasks.createdBy', '_id name')
    .populate('createdBy', '_id name')
    .exec((err, result) => {
      if (err) {
        return res.status(400).json({ error: err })
      }
      return res.status(200).json({
        message: `New task ${result.name.toUpperCase()} is added to your list`,
        result,
      })
    })
}

function updateTask(req, res) {
  const task = req.body.taskId
  let match = req.wall.tasks.find(o => o._id === task)
  match = _.extend(match, req.body.task)
  List.findByIdAndUpdate(
    req.body.listId,
    { tasks: { _id: task.taskId } },
    { $set: { 'tasks.$': match } }
  )
    .populate('tasks.createdBy', '_id name')
    .populate('createdBy', '_id name')
    .exec((err, result) => {
      if (err) {
        return res.status(400).json({ error: `${err} update failed` })
      }
      return res.status(200).json(result)
    })
}

function removeTask(req, res) {
  const task = req.body.taskId
  List.findByIdAndUpdate(req.body.listId, { $pull: { tasks: task } }, { new: true })
  .populate('comments.postedBy', '_id name')
  .populate('postedBy', '_id name')
  .exec((err, result) => {
      if(err) {
          return res.status(400).json({error: 'Delete Error. Try again'})
      }
      return res.status(200).json({
        message: 'You have deleted this task',
      })
  })
}

module.exports = {
    createList,
    Lists,
    getList,
    updateList,
    removeList,
    listById,
    allListByUser,
    isOwner,
    createTask,
    updateTask,
    removeTask,
}
