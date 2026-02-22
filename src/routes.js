const express = require('express');
const router = express.Router();

const userRoutes = require('../src/modules/user/user.route');
const messageRoutes = require('../src/modules/message/message.route');
const authRoutes = require('../src/modules/auth/auth.route');

const NotFoundError = require('./errors/NotFoundError');

router.use('/user', userRoutes);
router.use('/message', messageRoutes);
router.use('/auth', authRoutes);

router.use((req, res) => {
    throw new NotFoundError("Route not found");
})

module.exports = router;