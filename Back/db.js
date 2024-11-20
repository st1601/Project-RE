const express = require('express');
const sql = require('mssql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const authRoutes = require('./authRoutes');

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

async function connectToDatabase() {
    try {
        const pool = await sql.connect(config);
        console.log('Kết nối SQL Server thành công!');
        return pool; // Trả về pool để thực hiện query
    } catch (err) {
        console.error('Lỗi kết nối SQL Server:', err.message);
        throw err;
    }
};

async function getAllUsers() {
    try {
        const pool = await connectToDatabase();
        const result = await pool.request().query('SELECT * FROM Users');
        return result.recordset; // Trả về danh sách Users
    } catch (err) {
        console.error('Lỗi khi lấy dữ liệu:', err.message);
        throw err;
    }
};

// API lấy danh sách Users
app.get('/users', async (req, res) => {
    try {
        const users = await getAllUsers();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).send('Lỗi server: ' + err.message);
    }
});

// Hàm đăng nhập
async function login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send('Email và mật khẩu là bắt buộc.');
    }

    try {
        const pool = await connectToDatabase();

        // Kiểm tra email có tồn tại
        const result = await pool.request()
            .input('email', email)
            .query('SELECT * FROM Users WHERE email = @email');

        const user = result.recordset[0];
        if (!user) {
            return res.status(401).send('Email hoặc mật khẩu không chính xác.');
        }

        // Kiểm tra mật khẩu
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).send('Email hoặc mật khẩu không chính xác.');
        }

        // Tạo token
        const token = jwt.sign(
            { userID: user.userID, role: user.loai_tai_khoan },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        res.status(200).json({ token, role: user.loai_tai_khoan });
    } catch (err) {
        console.error('Lỗi đăng nhập:', err.message);
        res.status(500).send('Lỗi server.');
    }
}

// Sử dụng router cho auth
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('Server đang chạy. Truy cập /auth để sử dụng API.');
});

app.use((req, res) => {
    res.status(404).send('Route không tồn tại.');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

module.exports = {config, login, connectToDatabase, getAllUsers};
