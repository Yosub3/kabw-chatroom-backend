const userService = require('./user.service');
const NotFoundError = require('../../errors/NotFoundError');

class UserController {

    async getAll(req, res, next){
        try {
            const users = await userService.getAll();
            if(users.length === 0){
                throw new NotFoundError('No users found');
            }
            res.json({
                success: true,
                message: 'Users retrieved successfully',
                data: users
            });
        }catch (error) {
            next(error);
        }
    }

    async getById(req, res, next){
        try {
            const users = await userService.getAll();
            if(users.length === 0){
                throw new NotFoundError('No users found');
            }

            const userId = req.params.id;
            const user = await userService.getById(userId);
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }
            res.json({
                success: true,
                message: 'User retrieved successfully',
                data: user
            });
        } catch (error) {
            next(error);
        }
    }

    async delete(req, res, next){
        try {
            const userId = req.params.id;
            const result = await userService.delete(userId);
            if (!result) {
                throw new NotFoundError('User not found');
            }
            res.json({
                success: true,
                message: 'User deleted successfully',
            });
        } catch (error) {
            next(error);
        }
    }

    async create(req, res, next){
        try {
            const user = await userService.create(req.body);
            res.status(201).json({
                success: true,
                message: 'User created successfully',
                data: user
            });
        } catch (error) {
            next(error);
        }
    }

    async update(req, res, next){
        try {
            const userId = req.params.id;
            const user = await userService.update(userId, req.body);
            if (!user) {
                throw new NotFoundError('User not found');
            }
            res.json({
                success: true,
                message: 'User updated successfully',
                data: user
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new UserController();