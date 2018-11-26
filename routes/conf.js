/* eslint-disable */
import mysql from 'mysql';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '****',
  database: 'jeux_videos'
});

module.exports = connection;