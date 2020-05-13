const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

// Connect to MongoDB
mongoose.connect(process.env.ATLAS_URI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
const connection = mongoose.connection

connection.once('open', () => {
  console.log('MongoDB database connection established successfully')
})

// Routers
const usersRouter = require('./routes/users')

app.use('/users', usersRouter)

// Start server
app.listen(port, () => {
  console.log('Server is running on port %d', port)
})
