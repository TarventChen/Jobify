import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import 'express-async-errors';
//routers
import router from './routes/jobRouter.js';
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';



const app = express();
app.use(express.json());
//middleware
app.use('/api/v1/jobs', router);

app.use(morgan('dev'));

app.use('*', (req, res) =>{
  res.status(404).json({msg: 'not found'});
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ msg: 'something went wrong' });
});

app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5100;

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`server running on PORT ${port}....`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}

