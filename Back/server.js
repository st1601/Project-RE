const express = require('express');
const sql = require('mssql');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// Configurations
app.use(cors());
app.use(bodyParser.json());

const dbConfig = {
    user: 'SonU',
    password: 'Son160901@',
    server: '127.0.0.1',
    port: 1433,
    database: 'Web',
    options: {
        encrypt: false,           
        trustServerCertificate: true,
    }
};

sql.connect(dbConfig, err => {
    if (err) console.log(err);
    else console.log("Connected to SQL Server");
});

// Login API
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const query = `SELECT * FROM Users WHERE email = @Email`;
    const request = new sql.Request();
    request.input('Email', sql.NVarChar, email);

    request.query(query, (err, result) => {
        if (err) res.status(500).send('Error querying database');
        if (result.recordset.length === 0) {
            res.status(400).send('User not found');
        } else {
            const user = result.recordset[0];
            const validPassword = bcrypt.compareSync(password, user.password);
            if (!validPassword) {
                res.status(400).send('Invalid password');
            } else {
                const token = jwt.sign({ userID: user.userID, account_type: user.account_type }, 'secretkey');
                res.status(200).send({ token, account_type: user.account_type });
            }
        }
    });
});

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).send('Token required');
    jwt.verify(token, 'secretkey', (err, decoded) => {
        if (err) return res.status(500).send('Invalid token');
        req.userID = decoded.userID;
        req.account_type = decoded.account_type;
        next();
    });
};

// API for different home pages
app.get('/home', verifyToken, (req, res) => {
    switch (req.account_type) {
        case 'admin':
            res.send('Welcome to Admin Home Page');
            break;
        case 'artist':
            res.send('Welcome to Artist Home Page');
            break;
        case 'listener':
            res.send('Welcome to Listener Home Page');
            break;
        default:
            res.status(403).send('Access Denied');
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
