const express = require('express')
const app = express()
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const globalRoutes = require('./routes/routes')

// Configuration
dotenv.config()

// Middleware
app.use(bodyParser.json())
app.use('/', globalRoutes)

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
 console.log(`Node server running on http://localhost:${PORT}`)
})