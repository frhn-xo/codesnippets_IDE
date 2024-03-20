import mysql from 'mysql2';
import Redis from 'ioredis';
import dotenv from 'dotenv';

dotenv.config();

const redisUri = process.env.REDIS_URL;
const redis = new Redis(redisUri);

redis.set('ping', 'pong');
redis.get('ping').then((result) => {
  console.log('Redis: ping', result);
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

export { connection, redis };
