const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer', '').trim()
        console.log("TOKEN: " + token)
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log("DECODED: " + decoded)
        const user = await User.findOne({_id: decoded._id, 'tokens.token': token})
        console.log("USER: " + user)

        if (!user) {
            throw new Error("Cannot find user")
        }

        req.token = token
        req.user = user
        next()
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' })
    }
}

module.exports = auth