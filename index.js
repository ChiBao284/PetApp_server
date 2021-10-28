import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { connectDB } from './configs/db.js';
import authRoute from './routers/authRoute.js';
import postRoute from './routers/postRoute.js';
import { errorHandler } from './middlewares/errorHandler.js';
const app = express();
const PORT = process.env.APP_PORT;

const URI =
  'mongodb+srv://admin:KySegS6MJqmul38v@cluster0.0g4k1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: '30mb' }));
app.use(cors());

//Connect to Database
connectDB();
app.listen(PORT, () => {
  console.log('Server is running on port: ', PORT);
});

//Mount the router
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/posts', postRoute);

app.all('*', (req, res, next) => {
  const err = new Error('file not found');
  err.statusCode = 404;
  next(err);
});

app.use(errorHandler);
