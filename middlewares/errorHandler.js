const errorHandler = (err, req, res, next) => {
    console.error('[Errore]', err);

    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? '🔒' : err.stack,
    });
};

module.exports = errorHandler;