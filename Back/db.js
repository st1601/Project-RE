const express = require('express');
const sql = require('mssql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Cấu hình database
const config = {
    user: 'SonU',
    password: 'Son160901@',
    server: '127.0.0.1',
    port: 1433,
    database: 'Final',
    options: {
        encrypt: false,           
        trustServerCertificate: true,
    }
};

// Kết nối database
const poolPromise = new sql.ConnectionPool(dbConfig)
    .connect()
    .then(pool => {
        console.log('Connected to SQL Server');
        return pool;
    })
    .catch(err => console.error('Database Connection Failed: ', err));

module.exports = {sql, poolPromise };
