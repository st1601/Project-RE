const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const connectToDatabase = require('./db');
require('dotenv').config();

async function login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send('Email và mật khẩu là bắt buộc.');
    }

    try {
        const pool = await connectToDatabase();

        // Kiểm tra email tồn tại trong database
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

        // Tạo JWT token
        const token = jwt.sign(
            { userID: user.userID, role: user.loai_tai_khoan },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        res.status(200).json({
            message: 'Đăng nhập thành công!',
            token,
            role: user.loai_tai_khoan,
        });
    } catch (err) {
        console.error('Lỗi đăng nhập:', err.message);
        res.status(500).send('Lỗi server.');
    }
}

module.exports = { login };
