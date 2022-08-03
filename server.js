const express = require('express')
const app = express()
const mongoose = require('mongoose')
const taskRoute = require('./routes/taskRoute')
const userRoute = require('./routes/userRoute')
const cors = require('cors')
const PORT = 5000
require('dotenv').config()

// database connection
mongoose.connect(process.env.MONGODB_URI)
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error: '))
db.once('open', () => console.log('DB Connected successfully'))

// middleware
app.use(express.json())
app.use(express.static('./public'))
app.use(cors())
app.use(express.urlencoded({ extended: false }))

//routes
app.use('/api/task', taskRoute)
app.use('/api/user', userRoute)

app.listen(PORT, () =>
	console.log(`Server is listening at http://localhost:${PORT}`)
)
