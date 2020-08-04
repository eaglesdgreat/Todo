const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cookie = require('cookie-parser')
const cors = require('cors')
const logger = require('compression')
const path = require('path')

const config = require('./config')
const errorHandler = require('./_helpers/error.handler')

// Initialize Express App
const app = express()

// Configure MongoDB with mongoose
mongoose.connect(config.mongoUri, config.options)
  .then((conn) => conn)
  .catch((err) => console.log(err))

const db = mongoose.connection
db.once('open', () => {
  console.log('Connected to database successfully')
})

// Middlewares configuration
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookie())
app.use(cors())
app.use(logger())

// static files loading
app.use('/public', express.static(path.join(__dirname, 'public')))

// loading langing page view
app.get('/', (req, res) => {
  res.send('Building My todo app')
})

// error handler
app.use(errorHandler())

// listinging and loading server app
app.listen(config.port, (err) => {
  if (err) { console.log(err) }
  console.log(`App server running on port ${config.port}`)
})
