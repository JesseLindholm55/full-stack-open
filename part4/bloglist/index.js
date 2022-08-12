const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const mongoose = require('mongoose')
const User = require('./models/user')
const jwt = require('jsonwebtoken')

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
       request.token = authorization.substring(7)
  } else request.token = null
  next()
}

const userExtractor = async (request, response, next) => {
  let decodedToken = null
  try {
    decodedToken = jwt.verify(request.token, process.env.SECRET)
  } catch (error) {
    return response.status(401).json({error: 'Token missing or invalid '})
  }
  request.user = await User.findById(decodedToken.id)
  next()
}


mongoose.connect(config.MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.json())
app.use(tokenExtractor)

app.use('/api/login', loginRouter)
app.use('/api/blogs', userExtractor,  blogsRouter)
app.use('/api/users', usersRouter)

if (process.env.NODE_ENV !== 'test') {
  app.listen(config.PORT, () => {
    console.log(`Listening on port ${config.PORT}`)
  })
}
/*
app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})
*/



module.exports = app