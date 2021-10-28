export const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  // Duplicate
  if (err.code === 11000) {
    err.statusCode = 400;
    for (let x in err.keyValue) {
      err.message = `${x} have to be unique`;
    }
  }

  // ObjectId not found
  if (err.kind === 'ObjectId') {
    err.statusCode = 404;
    err.message = `The ${req.originalUrl} is not found because of wrong ID`;
  }

  // Validation
  if (err.error) {
    err.statusCode = 400;
    err.message = [];
    for (let x in err.error) {
      err.message.push(err.error[x].properties.message);
    }
  }

  res.status(err.statusCode).json({
    status: 'fail',
    message: err.message
  });
};
