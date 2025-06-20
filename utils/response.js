/**
 * Sends a success response to the client.
 * @param {Object} res - Express response object.
 * @param {Number} statusCode - HTTP status code.
 * @param {String} message - Message describing the success.
 * @param {Object} data - Data to send to the client.
 */

const sendSuccessResponse = (res, statusCode, message, data = {}) =>{
    res.status(statusCode).json({
        success: true ,
        message,
        data,
    });
};

/**
 * Sends an error response to the client.
 * @param {Object} res - Express response object.
 * @param {Number} statusCode - HTTP status code.
 * @param {String} message - Message describing the error.
 * @param {String} error - Error details.
 */

const sendErrorResponse = (res, statusCode, message, error = null) =>{
    res.status(statusCode).json({
        success: false,
        message,
        error,
    });
};

module.exports = {
    sendSuccessResponse,
    sendErrorResponse,
};