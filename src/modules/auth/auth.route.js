const express = require('express');
const router = express.Router();

const asyncErrorHandler = require('../../errors/asyncErrorHandler');
const authController = require('./auth.controller');
const {registerValidator, loginValidator} = require('./auth.validator');
const validateRequest = require('../../middlewares/validation.middleware');
const authJWT = require('../../middlewares/auth.middleware');

router.post('/login', 
    loginValidator,
    validateRequest,
    asyncErrorHandler(authController.login.bind(authController))
);

router.post('/register', 
    registerValidator, 
    validateRequest,
    asyncErrorHandler(authController.register.bind(authController))
);

router.get('/profile',
    authJWT, 
    asyncErrorHandler(authController.profile.bind(authController))
);

if(process.env.NODE_ENV !== 'development'){
    router.use((req, res) => {
        res.status(404).json({message: "Auth route not found"});
    });
}

module.exports = router;