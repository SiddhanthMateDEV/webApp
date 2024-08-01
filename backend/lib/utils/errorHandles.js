export const SendErrorMessage = (res, statusCode, message) => {
    return res.status(statusCode).json({
        error: message
    });
};

export default SendErrorMessage;