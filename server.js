import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();
import morgan from 'morgan';
import {nanoid} from 'nanoid';

//routers
import jobRouter from './routes/jobRouter.js';


//middleware
app.use('/api/v1/jobs', jobRouter);

app.use('*', (req, res) =>{
  res.status(404).json({msg: 'not found'});
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ msg: 'something went wrong' });
});

const port = process.env.PORT || 5100;
app.listen(port, () => {
  console.log(`server running on PORT ${port}....`);
});

