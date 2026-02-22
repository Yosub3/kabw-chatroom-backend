const {User} = require('../../../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const jwtService = require('./jwt.service')

const BadRequestError = require('../../errors/BadRequestError')

class AuthService {
    constructor(){
        this.SALT_ROUNDS = 10
    }

    async register({name, email, password}) {
        const existingUser = await User.findOne({where: {email}})
        if (existingUser) {
            throw new BadRequestError('Email already in use')
        }

        const hashedPassword = await bcrypt.hash(password, this.SALT_ROUNDS)
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        })

        const token = jwtService.sign({id: newUser.id, email: newUser.email})

        const userJson = newUser.toJSON()
        delete userJson.password
        return {user: userJson, token}
    }

    async login({email, password}) {
        const user = await User.findOne({where: {email}})
        if (!user) {
            throw new BadRequestError('Email not found')
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            throw new BadRequestError('Invalid password')
        }

        const userJson = user.toJSON()
        delete userJson.password
        const token = jwtService.sign({id: user.id, email: user.email})
        return {user: userJson, token}
    }

    async profile(userId){
        const user = await User.findByPk(userId)
        if (!user) {
            throw new BadRequestError('User not found')
        }
        const userJson = user.toJSON()
        delete userJson.password
        return userJson
    }
}

module.exports = new AuthService()