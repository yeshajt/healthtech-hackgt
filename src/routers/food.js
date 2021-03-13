const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const Food = require('../models/food')
const findRecipe = require("../recipe-search/recipe")
//(searchTerm, minCalorie, maxCalorie, restrictions)
router.get('/foods', auth, async (req, res) => {
    const terms = req.body
    if(!terms.searchTerm || !terms.minCalorie || !terms.maxCalorie) {
        res.status(400).send({
            "error": "Please provide the correct information in the request body."
        })
    }
    const item = findRecipe(terms.searchTerm, terms.minCalorie, terms.maxCalorie, terms.restrictions)
    res.status(200).send(item)
})

router.post('/foods', auth, async (req, res) => {
    const terms = req.body
    if(!terms.searchTerm || !terms.minCalorie || !terms.maxCalorie) {
        res.status(400).send({
            "error": "Please provide the correct information in the request body."
        })
    }
    const item = findRecipe(terms.searchTerm, terms.minCalorie, terms.maxCalorie, terms.restrictions)
    const food = new Food({
        ...item,
        owner: req.user._id
    })
    try {
        await food.save()
        res.status(201).send(food)
    } catch (e)  {
        res.status(401).send(e)
    }
})

router.post('/tasks', auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })
    try {
        await task.save()
        res.status(201).send(task)
    } catch (e)  {
        res.status(401).send(e)
    }
})

//GET /tasks?completed=true
//GET /tasks?limit=10&skip=20
//GET /tasks?sortBy=createdAt:desc
router.get('/tasks', auth, async (req, res) => {
    let match = {}
    let sort = {}
    
    if (req.query.completed) {
        match.completed = req.query.completed
    } else if (req.query.sortBy) {
        const parts = req.query.sortBy.split(":")
        sort[parts[0]] = (parts[1] === "desc") ? -1 : 1 
    }
    try {
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
        res.status(201).send(req.user.tasks)
    } catch (e) {
        res.status(401).send(e)
    }
})

router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id
    try {
        const task = await Task.findOne({_id, owner: req.user._id})
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const validUpdates = ['description', 'completed']

    const isAllowed = updates.every((update) => {
        return validUpdates.includes(update)
    })
    
    if (!isAllowed) {
        return res.status(400).send({
            error: 'Invalid update(s)!'
        })
    }

    const _id = req.params.id
    try {
        const newTask = await Task.findOne({_id, owner: req.user._id})
        if (!newTask) {
            return res.status(404).send()
        }
        updates.forEach((key) => {
            newTask[key] = req.body[key]
        })
        await newTask.save();
        res.status(201).send(newTask)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.delete('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id
    try {
        const task = await Task.findOneAndDelete({_id, owner: req.user._id})
        if (!task) {
            return res.status(404).send()
        }
        res.status(201).send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router