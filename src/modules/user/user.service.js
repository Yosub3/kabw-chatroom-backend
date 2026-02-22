const { User } = require('../../../models');
const bcrypt = require('bcrypt');
const BadRequestError = require('../../errors/BadRequestError');
const NotFoundError = require('../../errors/NotFoundError');
const ServerError = require('../../errors/ServerError');

class UserService {
    constructor(){
        this.SALT_ROUNDS = 10;
    }

    async getAll(){
        return await User.findAll({attributes: { exclude: ['password'] }});
    }

    async getById(id){
        return await User.findByPk(id, {attributes: {exclude: ['password']}});
    }

    async create(data){
        if(!data){
            throw new BadRequestError('No data provided for update');
        }
        const existingUser = await User.findOne({ where: { email: data.email } });
        if (existingUser) {
            throw new BadRequestError('Email already in use');
        }

        const hashedPassword = await bcrypt.hash(data.password, this.SALT_ROUNDS);
        const newUser = await User.create({ ...data, password: hashedPassword });
        const userJson = newUser.toJSON();
        delete userJson.password;
        return userJson;
    }

    async update(id, data){
        const user = await User.findByPk(id);
        if (!user) {
            throw new NotFoundError('User not found');
        }
        if(!data){
            throw new BadRequestError('No data provided for update');
        }
        if(data.email){
            if(data.email !== user.email){
                const existingUser = await User.findOne({ where: { email: data.email } });
                if (existingUser) {
                    throw new BadRequestError('Email already in use');
                }
            }
        }
        if (data.password) {
            data.password = await bcrypt.hash(data.password, this.SALT_ROUNDS);
        } else {
            delete data.password;
        }
        
        try{
            await user.update(data, {validate: true});
        } catch(err){
            console.error("error", err);
            const messages = err.errors ? err.errors.map(e => e.message).join(', ') : 'Validation error';
            throw new ServerError("Error updating user: "+messages);
        }

        const userJson = user.toJSON();
        delete userJson.password;
        return userJson;
    }

    async delete(id){
        const user = await User.findByPk(id);
        if (!user) {
            return null;
        }
        await user.destroy();
        return true;
    }
}

module.exports = new UserService();