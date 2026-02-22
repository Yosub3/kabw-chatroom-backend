const { body, param } = require('express-validator');

const messageValidator = [
    body('message')
        .notEmpty().withMessage('Pesan tidak boleh kosong')
        .isString().withMessage('Pesan harus berupa teks')
        .isLength({ max: 255 }).withMessage('Pesan maksimal 255 karakter'),
]

module.exports = {
    messageValidator
};
