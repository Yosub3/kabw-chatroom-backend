const express = require('express');
const router = express.Router();

const asyncErrorHandler = require('../../errors/asyncErrorHandler');
const messageController = require('./message.controller');
const {
    messageValidator
} = require('./message.validator')
const validateRequest = require('../../middlewares/validation.middleware');
const authJWT = require('../../middlewares/auth.middleware');

router.use(authJWT);

router.get('/', asyncErrorHandler(
    messageController.getAll.bind(messageController)
));

router.post('/', 
    messageValidator,
    validateRequest,
    asyncErrorHandler(messageController.create.bind(messageController))
);

router.use((req, res) => {
    res.status(404).json({message: "User route not found"});
});

module.exports = router;