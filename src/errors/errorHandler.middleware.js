const HttpError = require('./HttpError');
const { JsonWebTokenError } = require('jsonwebtoken');

function errorHandler(err, req, res, next) {
    if (err instanceof HttpError) {
        res.status(err.statusCode).json({
            success: false,
            message: err.message,
        });
        return;
    }

    // if (err instanceof JsonWebTokenError) {
    //     res.status(401).json({
    //         success: false,
    //         message: "Invalid token",
    //     });
    //     return;
    // }

    if(process.env.NODE_ENV === 'development') {
        if(err instanceof Error){
            res.status(500).json({
                success: false,
                message: err.message
            });
            return;
        }
    }

    console.error(err);

    return res.status(500).json({
        success: false,
        message: 'Internal Server Error',
    });
}

module.exports = errorHandler;