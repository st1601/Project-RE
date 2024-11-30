const express = require('express');
const sql = require('mssql');
const router = express.Router();

// API lấy danh sách nghệ sĩ
router.get('/artists', async (req, res) => {
  try {
    const result = await sql.query`SELECT userID, full_name, image 
                                   FROM Users 
                                   WHERE role = 'artist'`;

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: 'No artists found' });
    }

    res.status(200).json(result.recordset);
  } catch (error) {
    console.error('Error fetching artists:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;
