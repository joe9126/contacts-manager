const {constants} = require('../constants');
const errorHandler = (err, req, res, next)=>{
    const statusCode = res.statusCode ? res.statusCode : 500;
    res.json({message: err.message, stackTrace:err.stack });

    let errorResponse = {
        title: "Error",
        message: err.message,
        stackTrace: err.stack,
    };

    switch(statusCode){
        case constants.VALIDATION_ERROR:
            errorResponse.title = "Validation error";
            break;
        case constants.NOT_FOUND:
            errorResponse.title = "Not found error";
            break;
        case constants.SERVER_ERROR:
            errorResponse.title = "Server error";
            break;
        case constants.FORBIDDEN:
            errorResponse.title = "Forbidden";
            break;
        case constants.UNAUTHORIZED:
            errorResponse.title = "Unauthorized";
            break;

        default:
            console.log('No error found');
    }
    res.status(statusCode).json(errorResponse);
};

module.exports = errorHandler;