const authService = require('./auth.service');

class AuthController {
    /**
     * @param {Object} req - Express request object, req.body = {name, email, password, number} 
     * @param {Object} res - Express response object
     * @param {Object} next - Express next middleware function
     */
    async register(req, res, next) {
        try {
            const data = req.body;
            const result = await authService.register(data);
            res.status(201).json({
                success: true,
                message: 'User registered successfully',
                data: result
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * @param {Object} req - Express request object, req.body = {email, password}
     * @param {Object} res - Express response object
     * @param {Object} next - Express next middleware function
     */
    async login(req, res, next) {
        try {
            const data = req.body;
            const result = await authService.login(data);
            res.status(200).json({
                success: true,
                message: 'Login successful',
                data: result
            });
        } catch (error) {
            next(error);
        }
    }

    async profile(req, res, next) {
        try {
            const userId = req.userId;
            const result = await authService.profile(userId);
            res.status(200).json({
                success: true,
                message: 'User profile retrieved successfully',
                data: result
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new AuthController();