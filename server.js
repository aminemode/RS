const express = require('express')
const bodeyparser = require('body-parser')
const userRoutes = require('./routes/user.routes')
const bodyParser = require('body-parser')
require('dotenv').config({path: './config/.env'})
require('./config/db')
const app = express()
const port = process.env.PORT


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))




//routes
app.use('/api/user', userRoutes)



//server
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))