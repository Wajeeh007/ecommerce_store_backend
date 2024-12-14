const mongoose = require('mongoose')
const errors = require('../errors/index')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const customer = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
             'Provide valid email'
       ]
    },
    password: {
        type: String,
        minlength: 6
    },
    social_auth: {
        type: Boolean,
        default: false
    },
    verified: {
        type: Boolean,
        default: false
    }
})

customer.pre('save', async function () {
    try {
        this.password = await bcrypt.hash(this.password, 10)
    } catch (err) {
        throw new errors.CustomError('Internal Server Error. Retry') 
    }
})

customer.methods.createJWT = function() {
    try {
        const token = jwt.sign({userId: this._id, email: this.email}, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_LIFETIME
        })
        return token
    } catch (err) {
        throw new errors.CustomError('Internal Server Error. Retry')
    }
}

customer.methods.comparePassword = async function(receivedPassword) {
    try {
        const isMatch = await bcrypt.compare(receivedPassword, this.password)
        return isMatch
    } catch (err) {
        throw new errors.CustomError('Internal Server Error. Retry')
    }
}

module.exports = mongoose.model('customers', customer)