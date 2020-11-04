class ServerError extends Error {
    constructor(code, message) {
        super();
        this.code = code || 500;
        this.message = message || 'Error';
    }
}

const handleHttpError = (err, res) => {
    const { code, message } = err;

    res.status(code || 500).json({
        message
    });
}

module.exports = { ServerError, handleHttpError }