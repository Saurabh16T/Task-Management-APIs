const statusCodes = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UN_AUTHORIZED: 401,
    PAGE_NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500
};

function sendResponse(req, res, message = "", data, statusCode = statusCodes.OK ) {
    let responseData = {
        statusCode,
        message,
        data: data || {}
    };
    res.status(statusCode).send(responseData);
}

module.exports = {
    sendResponse,
    statusCodes
};