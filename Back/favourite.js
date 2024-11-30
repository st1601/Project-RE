const express = require('express');
const sql = require('mssql');
const router = express.Router();

// API để thêm bài hát vào danh sách yêu thích
router.post('/favourite', async (req, res) => {
  const { userID, songID } = req.body;

  if (!userID || !songID) {
    return res.status(400).json({ message: 'userID and songID are required' });
  }

  try {
    const date = new Date();
    await sql.query`INSERT INTO Favolite (userID, songID, fav_date) VALUES (${userID}, ${songID}, ${date})`;
    res.status(200).json({ message: 'Song added to favourites successfully' });
  } catch (error) {
    console.error('Error adding song to favourites:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});
// API lấy danh sách bài hát yêu thích
router.get('/favourites/:userID', async (req, res) => {
    const { userID } = req.params;
  
    try {
      const result = await sql.query`SELECT 
        Songs.songID, 
        Songs.title, 
        Songs.genre, 
        Songs.song_file, 
        Songs.song_image
      FROM Favolite
      INNER JOIN Songs ON Favolite.songID = Songs.songID
      WHERE Favolite.userID = ${userID}`;
  
      if (result.recordset.length === 0) {
        return res.status(404).json({ message: 'No favourite songs found' });
      }
  
      res.status(200).json(result.recordset);
    } catch (error) {
      console.error('Error fetching favourite songs:', error);
      res.status(500).json({ message: 'Server error', error });
    }
  });

module.exports = router;
