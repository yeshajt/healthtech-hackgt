const express = require('express')
const multer = require('multer')
const sharp  = require('sharp')
const router = new express.Router()
const auth = require('../middleware/auth')
const User = require('../models/user')
const { sendWelcomeEmail, sendCancellationEmail } = require('../emails/account')
const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter (req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error("File must be a JPG, JPEG, or a PNG."))
        }
    
        cb(undefined, true)
    }
})

router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        //Not doing await for send as we don't need to wait for email to send to follow through with other tasks
        sendWelcomeEmail(user.name, user.email)
        const token = await user.generateAuthToken()
        res.status(201).send({user, token})
    } catch (e) {
        res.status(400).send(e)
    }

})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token})
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.status(201).send()
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()

        res.status(200).send()
    } catch (e) {
        res.status
    }
})

router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250}).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.status(200).send(req.user)
}, (error, req, res, next) => {
    res.status(400).send({error: error.message})
})

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})

router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update)
    })

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!'})
    }

    const _id = req.user._id
    try {
        //Didn't use findByIdAndUpdate because it does not use save
        //needs to go through save in order to go through pre
        const user = req.user
        updates.forEach((key) => {
            user[key] = req.body[key]
        })
        await user.save()

        if (!user) {
            res.status(404).send()
            return
        }
        
        res.status(200)
        res.send(user)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.delete('/users/me', auth, async (req, res) => {
    const _id = req.user._id
    try {
        await req.user.remove()
        sendCancellationEmail(req.user.name, req.user.email)
        res.status(201).send(req.user)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.delete('/users/me/avatar', auth, async (req, res) => {
    const user = req.user
    user.avatar = undefined
    await user.save()
    res.status(200).send()
})

router.get('/users/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        if (!user || !user.avatar) {
            throw new Error()
        }

        res.set('Content-Type', 'image/png')
        res.send(user.avatar)
    } catch (e) {
        res.status(404).send()
    }
})



module.exports = router