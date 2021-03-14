const { ObjectID } = require('mongodb')
const mongoose = require('mongoose')


const foodSchema = mongoose.Schema({
        label: {
            type: String,
            required: true,
            trim: true
        },
        caloriesPerServing: {
            type: Number,
            required: true,
            default: 0
        },
        fat: {
            type: Number,
            required: true,
            default: 0
        },
        protein: {
            type: Number,
            required: true,
            default: 0
        },
        carb: {
            type: Number,
            required: true,
            default: 0
        },
        sugar: {
            type: Number,
            required: true,
            default: 0
        },
        ingredients: {
            type: String,
            required: true,
        },
        eaten: {
            type: Boolean,
            default: false
        },
        price: {
            type: Number,
            default: 8
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User"
        },
        image: {
            type: Buffer
        }
}, {
    timestamps: true
})
const Food = mongoose.model('Food', foodSchema)

module.exports = Food