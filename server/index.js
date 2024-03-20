import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import errorMiddleware from './middlewares/errorMiddleware.js';
import router from './routes/index.js';
import morgan from 'morgan';
import { connection } from './dbs/index.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(errorMiddleware);
app.use(router);

app.get('/', (req, res) => {
  res.send('API is running');
});

app.use((req, res, next) => {
  req.connection = connection;
  next();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
