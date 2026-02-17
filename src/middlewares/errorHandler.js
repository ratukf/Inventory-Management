const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 400;

  res.status(statusCode).json({
    status: 'error',
    message: err.message || 'Internal Server Error',
  });
};

export { errorHandler };
