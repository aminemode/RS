const express = require('express')
const cookieParser = require('cookie-parser')
const userRoutes = require('./routes/user.routes')
const bodyParser = require('body-parser')
require('dotenv').config({path: './config/.env'})
require('./config/db')
const {checkUser, requireAuth} = require('./middleware/auth.middleware')
const app = express()
const port = process.env.PORT


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser());


//jwt
app.get('*', checkUser)
app.get('/jwtid', requireAuth, (req, res) => {
    res.status(200).send(res.locals.user._id)
})

//routes
app.use('/api/user', userRoutes)



//server
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))