import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  //Access Authorization from req header
  const Authorization = req.header('authorization');

  if (!Authorization) {
    //Error: Unauthorized
    const err = new Error('Unauthorized');
    err.statusCode = 401;
    return next(err);
  }

  //Get token
  const accessToken = Authorization.replace('Bearer ', '');
  //VerifyToken
  // const { userId } = jwt.verify(accessToken, process.env.APP_SECRET);
  const userId = jwt.verify(accessToken, process.env.APP_SECRET);

  // Assign req
  req.user = { userId };

  next();
};
