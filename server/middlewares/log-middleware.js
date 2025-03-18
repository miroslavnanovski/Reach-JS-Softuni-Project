const logCRUDOperations = (req, res, next) => {
    const { method, originalUrl, body } = req;
    const logEntry = `[${new Date().toISOString()}] ${method} ${originalUrl} - ${JSON.stringify(body)}`;

    console.log(logEntry); // Log to console

    next(); // Move to the next middleware
};

export default logCRUDOperations;

