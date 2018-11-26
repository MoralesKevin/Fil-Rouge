/* eslint-disable */
import mysql from 'mysql';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '0933021906',
  database: 'jeux_videos'
});

module.exports = connection;