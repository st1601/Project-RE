const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { poolPromise } = require("./db");
const router = express.Router();
const sql = require('mssql');

const SECRET_KEY = "your_secret_key";

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
      return res.status(401).json({ message: 'Access denied' });
    }
    
    try {
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      req.user = verified;
      if (req.user.account_type !== 'artist') {
        return res.status(403).json({ message: 'Access forbidden: not an artist' });
      }
      next();
    } catch (err) {
      res.status(400).json({ message: 'Invalid token' });
    }
  };
// Đăng nhập
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const pool = await poolPromise;
        const result = await pool
            .request()
            .input("email", sql.NVarChar, email)
            .query("SELECT * FROM Users WHERE email = @email");

        if (result.recordset.length === 0) {
            return res.status(404).json({ message: "Email không tồn tại" });
        }

        const user = result.recordset[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Sai mật khẩu" });
        }

        const token = jwt.sign({ userID: user.userID, account_type: user.account_type }, SECRET_KEY, {
            expiresIn: "1h",
        });

        res.status(200).json({ token, account_type: user.account_type });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//Đổi mk
router.post('/reset', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .input('email', sql.NVarChar, email)
        .query('SELECT * FROM Users WHERE email = @email');
  
      if (result.recordset.length === 0) {
        return res.status(404).json({ message: 'Email not found' });
      }
  
      await pool
        .request()
        .input('email', sql.NVarChar, email)
        .input('password', sql.NVarChar, password)
        .query('UPDATE Users SET password = @password WHERE email = @email');
  
      res.status(200).json({ message: 'Password reset successfully.' });
    } catch (error) {
      res.status(500).json({ message: 'Error resetting password.', error });
    }
  });

// API: Lấy danh sách bài viết
router.get('/papers', async (req, res) => {
    try {
      const pool = await poolPromise;
      const result = await pool.request().query(`
        SELECT 
          Papers.paperID,
          Songs.song_name AS song_title,
          Users.user_name AS user_name,
          Papers.content,
          Papers.post_date,
          Papers.paper_image
        FROM Papers
        INNER JOIN Songs ON Papers.songID = Songs.songID
        INNER JOIN Users ON Papers.userID = Users.userID
      `);
      res.status(200).json(result.recordset);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch papers', error });
    }
  });
// API: Tạo bài viết mới
router.post('/papers', async (req, res) => {
    const { songID, userID, content, paper_image } = req.body;
  
    try {
      const pool = await poolPromise;
      await pool.request()
        .input('songID', sql.Int, songID)
        .input('userID', sql.Int, userID)
        .input('content', sql.NVarChar, content)
        .input('paper_image', sql.NVarChar, paper_image)
        .query(`
          INSERT INTO Papers (songID, userID, content, paper_image)
          VALUES (@songID, @userID, @content, @paper_image)
        `);
      res.status(201).json({ message: 'Paper created successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to create paper', error });
    }
  });
module.exports = {router, authMiddleware};
