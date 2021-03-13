const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Food = require('./food')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid.')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age cannot be less than zero.')
            }
        }
    },
    sex: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(pass) {
            if (pass.toLowerCase().includes('password')) {
                throw new Error('Password cannot have password in the field')
            }
        }
    },
    militaryCalorieCount: {
        type: Number,
        default: 4500
    },
    goalCalorieCount: {
        type: Number,
        default: 2000
    },
    currentCalorieCount: {
        type: Number,
        default: 4500
    },
    dailyCaloriesEaten: {
        type: Number,
        default: 0
    },
    restrictions: {
        type: String
    },
    dailyBudget: {
        type: Number,
        default: 20
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    avatar: {
        type: Buffer
    }
}, {
    timestamps: true
})

userSchema.virtual('foods', {
    ref: 'Food',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.methods.toJSON = function() {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar

    return userObject
}

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET)

    user.tokens = user.tokens.concat({ token })
    await user.save()
    
    return token
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email})
    if (!user) {
        throw new Error("Cannot find user")
    }
    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Incorrect password')
    }

    return user
}

userSchema.methods.decrementCurrentCalorieCount = async function () {
    const user = this
    this.currentCalorieCount = this.militaryCalorieCount - 200
    if (currentCalorieCount < militaryCalorieCount) {
        this.currentCalorieCount = this.goalCalorieCount
    }
    await user.save()
}

//Need access to this binding for middleware function here
//Hash the plain text password before saving
userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next() //end once user is free to be saved
})

//Delete user tasks when user is removed
userSchema.pre('remove', async function (next) {
    const user = this
    await Food.deleteMany({owner: user._id})
    next()
})
const User = mongoose.model('User', userSchema)

module.exports = User