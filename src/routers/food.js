const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const { findByIdAndUpdate } = require('../models/food')
const Food = require('../models/food')
const User = require('../models/user')
const findRecipe = require("../recipe-search/recipe")
//(searchTerm, minCalorie, maxCalorie, restrictions)
router.get('/foods/single', auth, async (req, res) => {
    const terms = req.body
    if(!terms.searchTerm || !terms.minCalorie || !terms.maxCalorie) {
        res.status(400).send({
            "error": "Please provide the correct information in the request body."
        })
    }
    const item = findRecipe(terms.searchTerm, terms.minCalorie, terms.maxCalorie, terms.restrictions)
    res.status(200).send(item)
})

router.post('/foods/single', auth, async (req, res) => {
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

router.post('/foods', auth, async (req, res) => {
    const terms = req.body
    let searchTerms = []
    if (!req.user.restrictions || req.user.restrictions.toLowerCase() != 'vegetarian') {
        searchTerms = ['chicken', 'beef', 'turkey','pork']
    }
    searchTerms = searchTerms.concat(['broccoli', 'tomato', 'carrot', 'lettuce', 'potato', 'beans', 'rice', 'avocado', 'noodle'])
    const randItem1 = Math.floor(Math.random() * searchTerms.length)
    const randItem2 = Math.floor(Math.random() * searchTerms.length)
    const randItem3 = Math.floor(Math.random() * searchTerms.length)
    const breakfastCal = Math.floor(req.user.currentCalorieCount / 6)
    const lunchCal = Math.floor(req.user.currentCalorieCount / 6) * 2
    const dinnerCal = Math.floor(req.user.currentCalorieCount / 6) * 2
    const item1 = findRecipe(searchTerms[randItem1], breakfastCal - 150, breakfastCal + 150, req.user.restrictions)
    const item2 = findRecipe(searchTerms[randItem2], lunchCal - 150, lunchCal + 150, req.user.restrictions)
    const item3 = findRecipe(searchTerms[randItem3], dinnerCal - 150, dinnerCal + 150, req.user.restrictions)

    const food1 = new Food({
        ...item1,
        owner: req.user._id
    })
    const food2 = new Food({
        ...item2,
        owner: req.user._id
    })
    const food3 = new Food({
        ...item3,
        owner: req.user._id
    })
    try {
        await food1.save()
        await food2.save()
        await food3.save()

        const foods = [food1, food2, food3]

        res.status(201).send(foods)
    } catch (e)  {
        res.status(401).send(e)
    }
})

router.patch('/foods/:id/eaten', auth, async (req, res) => {
    const _id = req.params.id
    
    try {
        const selectedFood = await Food.findById(_id)
        if (!selectedFood.eaten) {
            await Food.findByIdAndUpdate(_id, {
                eaten: true
            })
            console.log(req.user.dailyCaloriesEaten)
            console.log(selectedFood.caloriesPerServing)
            await User.findByIdAndUpdate(req.user._id, {
                dailyCaloriesEaten: req.user.dailyCaloriesEaten + selectedFood.caloriesPerServing
            })
            await selectedFood.save()
            console.log(req.user.dailyCaloriesEaten)
            const newUser = await User.findById(req.user._id)
            const cal = newUser.dailyCaloriesEaten
            res.send({
                dailyCaloriesEaten: cal
            })
            return;
        }
        const newUser = await User.findById(req.user._id)
        const cal = newUser.dailyCaloriesEaten
        res.status(200).send({
            dailyCaloriesEaten: cal,
            message: "Food has already been eaten"
        })
        return;
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/foods', auth, async (req, res) => {
    try {
        const food = await Food.deleteMany({owner: req.user._id})
        if (!food) {
            return res.status(404).send()
        }
        res.status(201).send(food)
    } catch (e) {
        res.status(500).send(e)
    }
})

//GET /foods?completed=true
//GET /tasks?limit=10&skip=20
//GET /tasks?sortBy=createdAt:desc
router.get('/foods', auth, async (req, res) => {
    let match = {}
    let sort = {}
    
    if (req.query.price) {
        match.price = req.query.price
    } else if (req.query.sortBy) {
        const parts = req.query.sortBy.split(":")
        sort[parts[0]] = (parts[1] === "desc") ? -1 : 1 
    }
    try {
        await req.user.populate({
            path: 'foods',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
        res.status(201).send(req.user.foods)
    } catch (e) {
        res.status(401).send(e)
    }
})



//PAST METHODS

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