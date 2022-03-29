const express = require('express')
const connectDB = require('./config/connectDB')
const AgentRoute = require('./routes/Agent')
const authRoute = require('./routes/auth')
const  app = express()
require('dotenv').config()

connectDB()
app.use(express.json())
app.use("/api/auth",authRoute)
app.use('/api/agent',AgentRoute)

app.listen(process.env.port, ()=> console.log("port is running"))