const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'List is required',
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  tasks: [{
    name: String,
    description: String,
    createdBy: { type: mongoose.Schema.ObjectId, ref: 'User' },
    created: { type: Date, default: Date.now },
    updated: Date,
    completed: { type: Boolean, default: false, },
  }],
  created: {
    type: Date,
    default: Date.now,
  },
  updated: {
    type: Date
  },
})

module.exports = mongoose.model('Task', TaskSchema)
