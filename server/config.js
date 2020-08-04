module.exports = config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 6000,
  jwtSecret: process.env.JWT_SECRET || 'VIN FA5B 3EC1 8452 8381 663',
  mongoUri: process.env.MONGO_URI || (process.env.HOST || 'mongodb://') + (process.env.IP || 'localhost') + ':'
    + (process.env.Port || '27017') + '/todo',
  options: {
    useCreateIndex: true, 
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  }
}