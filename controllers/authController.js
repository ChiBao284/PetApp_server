import { User } from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
export const register = async (req, res, next) => {
  try {
    //req.body -name , email, password
    const user = await User.create(req.body);
    const accessToken = jwt.sign({ userID: user._id }, process.env.APP_SECRET);
    res.status(200).json({
      status: 'success',
      data: { accessToken, userName: user.name }
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      //error
      const err = new Error('Email is not correct');
      err.statusCode;
      return next(err);
    }
    if (bcrypt.compareSync(req.body.password, user.password)) {
      const accessToken = jwt.sign(
        { userID: user._id },
        process.env.APP_SECRET
      );
      res.status(200).json({
        status: 'success',
        data: {
          accessToken,
          userName: user.name
        }
      });
    } else {
      const err = new Error('Password is not correct');
      err.statusCode;
      return next(err);
    }
  } catch (error) {
    next(error);
  }
};
