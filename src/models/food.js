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
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User"
        }
}, {
    timestamps: true
})
const Food = mongoose.model('Food', foodSchema)

module.exports = Food