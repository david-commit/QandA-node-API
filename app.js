const express = require('express')
const app = express()
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const globalRoutes = require('./routes/routes')
const authRoutes = require('./routes/auth')
const cors = require('cors')

// Configuration
dotenv.config()

// Middleware
// app.use(express.json())
app.use(bodyParser.json())
app.use('/', globalRoutes)
app.use('/auth', authRoutes)
app.use(cors())

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
 console.log(`Node server running on http://localhost:${PORT}`)
})