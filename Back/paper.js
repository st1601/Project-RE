const express = require('express');
const router = express.Router();
const sql = require('mssql');
const { poolPromise } = require('./db');

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
module.exports = router;

module.exports = router;
