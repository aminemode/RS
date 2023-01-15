const jwt = require('jsonwebtoken')
const UserModel = require('../models/user.model')
const maxAge = 3 * 24 * 60 * 60 * 1000;

module.exports.checkUser = (req, res, next) => {
    const token = req.cookies.jwt
    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
            if (err) {
                res.locals.user = null
                res.cookie('jwt', '', {maxAge: 1})
                next()
            } else {
                let user = await UserModel.findById(decodedToken.id)
                res.cookie('jwt', token, { httpOnly: true, maxAge});
                res.locals.user = user
                next()
            }
        })
    } else {
        res.locals.user = null
        next()
    }
}

module.exports.requireAuth = (req, res, next) => {
    const token = req.cookies.jwt
    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
            if (err) {
                console.log(err)
            } else {
                console.log(decodedToken.id)
                next()
            }
        })
    } else {
        console.log('rouh 9awed')
    }
}

module.exports.requireLogin = (req, res, next) => {
    // const token = req.cookies.jwt
    // if (!token) {
    //     res.status(400).send('no cookie')
    // }
    next()
} 