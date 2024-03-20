import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import errorMiddleware from './middlewares/errorMiddleware.js';
import router from './routes/index.js';
import morgan from 'morgan';
import mysql from 'mysql2';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(morgan('dev'));
app.use(cors());
app.use(errorMiddleware);
app.use(router);

app.get('/', (req, res) => {
  res.send('API is running');
});

const connection = mysql.createConnection({
  host: process.env.SQL_HOST,
  port: 25028,
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_DATABASE,
  charset: 'utf8mb4',
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

app.use((req, res, next) => {
  req.pool = pool;
  next();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
