function asyncErrorHandler(fn) {
	return function (req, res, next) {
		Promise.resolve(fn(req, res, next)).catch((err) => next(err)); // Catch only executed if promise is rejected
	};
}

module.exports = asyncErrorHandler;