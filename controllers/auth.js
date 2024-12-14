const customer = require('../models/customers.js')
const returnJson = require('../custom_functions/return_json')
const errors = require('../errors/index')

const login = async (req, res) => {
    const {social_auth, password, email} = req.body

    if(social_auth) {

    } else {
        if(!email || !password) {
            throw new errors.BadRequestError('Please provide both email and password')
        } else {
            const user = await customer.findOne({email})

            if(!user) {
                throw new errors.UnauthenticatedError(`No user with email: ${email} exists`)
            } else {
                const comparedPassword = await user.comparePassword(password)
                    if(!comparedPassword) {
                        throw new errors.UnauthenticatedError('Incorrect password')
                    } else {
                        const token = user.createJWT()
                        return returnJson({res: res, statusCode: 200, message: 'Login successful', data: {token: token}, encryptData: true})
                    }
                }
            }
        }
}

const register = async (req, res) => {
    const {social_auth, password} = req.body

    if(social_auth) {

    } else {
        if(!password) {
            throw new errors.BadRequestError('Provide password')
        } else {
            const user = await customer.create({...req.body})
            const token = await user.createJWT()
            return returnJson({res: res, statusCode: 201, message: 'Account created successfully', data: {token: token}, encryptData: true})
        }
    }
}

module.exports = {login, register}