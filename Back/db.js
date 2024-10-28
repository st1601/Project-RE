const express = require('express');
const sql = require('mssql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Cấu hình kết nối
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

app.get('/users', async (req, res) => {
    try {
        await sql.connect(config);
        const result = await sql.query`SELECT * FROM Users`;
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send('Lỗi kết nối đến cơ sở dữ liệu.');
    } finally {
        await sql.close();
    }
});

// Đăng nhập
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        await sql.connect(config);
        const result = await sql.query`SELECT * FROM Users WHERE email = ${email}`;
        const user = result.recordset[0];

        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ userID: user.userID, accountType: user.account_type }, 'your_jwt_secret', { expiresIn: '1h' });
            res.json({ token, accountType: user.account_type });
        } else {
            res.status(401).send('Invalid credentials');
        }
    } catch (err) {
        res.status(500).send('Server error');
    } finally {
        await sql.close();
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
