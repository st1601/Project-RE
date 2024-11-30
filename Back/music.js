const express = require('express');
const router = express.Router();
const sql = require('mssql');
const multer = require('multer');
const { poolPromise } = require('./db');
const authMiddleware = require('./auth');

// API: Lấy danh sách bài hát
router.get('/', async (req, res) => {
    try {
      const pool = await poolPromise;
      const result = await pool.request().query(`
        SELECT 
          Songs.songID, 
          Songs.title, 
          Songs.genre, 
          Songs.song_file, 
          Songs.song_image, 
          Users.user_name AS uploaded_by
        FROM Songs
        INNER JOIN Users ON Songs.userID = Users.userID
      `);
      res.status(200).json(result.recordset);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch songs', error });
    }
  });
  router.get('/song', async (req, res) => {
    const { userID } = req.user; // Lấy userID từ token
    try {
      const result = await sql.query`SELECT songID, title, genre, song_file, song_image 
                                     FROM Songs 
                                     WHERE userID = ${userID}`;
      if (result.recordset.length === 0) {
        return res.status(404).json({ message: 'No songs found for this artist' });
      }
      res.status(200).json(result.recordset);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  });
// Cấu hình multer để xử lý file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Thư mục lưu file upload
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Tạo tên file duy nhất
  }
});
const upload = multer({ storage });

// Route tạo bài hát mới
router.post('/create', upload.fields([{ name: 'song_file' }, { name: 'song_image' }]), async (req, res) => {
  try {
    const { title, genre, userID, upload_date } = req.body;
    const songFile = req.files['song_file'][0].path; // Đường dẫn file nhạc
    const songImage = req.files['song_image'][0].path; // Đường dẫn ảnh

    // Thực hiện truy vấn SQL để chèn bài hát mới vào database
    const result = await sql.query`INSERT INTO Songs (title, userID, genre, song_file, upload_date, song_image)
                                   VALUES (${title}, ${userID}, ${genre}, ${songFile}, ${upload_date}, ${songImage})`;

    res.status(201).json({ message: 'Bài hát đã được tạo thành công', data: result });
  } catch (error) {
    console.error('Error creating music', error);
    res.status(500).json({ message: 'Server error', error });
  }
});
router.get('/musics', async (req, res) => {
  try {
    const result = await sql.query`SELECT songID, title, genre, song_file, song_image, upload_date 
                                   FROM Songs`;

    res.status(200).json(result.recordset);
  } catch (error) {
    console.error('Error fetching songs:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});
router.get('/songs/:artistId', async (req, res) => {
  const { artistId } = req.params; // Lấy artistId từ URL
  try {
    const result = await sql.query`SELECT songID, title, genre, song_file, song_image 
                                   FROM Songs 
                                   WHERE userID = ${artistId}`;
    if (result.recordset.length === 0) {
      return res.status(404).json({ message: 'No songs found for this artist' });
    }
    res.status(200).json(result.recordset);
  } catch (error) {
    console.error('Error fetching songs for artist:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = {router, authMiddleware};