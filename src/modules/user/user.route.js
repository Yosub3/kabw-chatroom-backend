const express = require('express');
const router = express.Router();

const asyncErrorHandler = require('../../errors/asyncErrorHandler');
const userController = require('./user.controller');
const {
  createUserValidator,
  updateUserValidator,
  idParamValidator,
} = require('./user.validator');
const validateRequest = require('../../middlewares/validation.middleware');
const authJWT = require('../../middlewares/auth.middleware');

router.use(authJWT);

router.get('/', asyncErrorHandler(
    userController.getAll.bind(userController)
));

router.get('/:id', 
    idParamValidator,
    validateRequest,
    asyncErrorHandler(userController.getById.bind(userController))
);

router.post('/', 
    createUserValidator,
    validateRequest,
    asyncErrorHandler(userController.create.bind(userController))
);

router.put('/:id', 
    idParamValidator,
    updateUserValidator,
    validateRequest,
    asyncErrorHandler(userController.update.bind(userController))
);

router.delete('/:id', 
    idParamValidator,
    validateRequest,
    asyncErrorHandler(userController.delete.bind(userController))
);

router.use((req, res) => {
    res.status(404).json({message: "User route not found"});
});

module.exports = router;