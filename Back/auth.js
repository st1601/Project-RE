const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { poolPromise } = require("./db");
const router = express.Router();

const SECRET_KEY = "your_secret_key";

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

  router.get('/', async (req, res) => {
    try {
      const pool = await poolPromise;
      const result = await pool.request().query('SELECT * FROM Users');
      res.status(200).json(result.recordset);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch users', error });
    }
  });

  router.post('/', async (req, res) => {
    const { user_name, full_name, email, password, dateOfBirth, phone, address, account_type, bio, profilePicture } = req.body;
  
    try {
      const pool = await poolPromise;
      await pool
        .request()
        .input('user_name', sql.NVarChar, user_name)
        .input('full_name', sql.NVarChar, full_name)
        .input('email', sql.NVarChar, email)
        .input('password', sql.NVarChar, password)
        .input('dateOfBirth', sql.Date, dateOfBirth)
        .input('phone', sql.NVarChar, phone)
        .input('address', sql.NVarChar, address)
        .input('account_type', sql.NVarChar, account_type)
        .input('bio', sql.NVarChar, bio)
        .input('profilePicture', sql.NVarChar, profilePicture)
        .query(`
          INSERT INTO Users (user_name, full_name, email, password, dateOfBirth, phone, address, account_type, bio, profilePicture)
          VALUES (@user_name, @full_name, @email, @password, @dateOfBirth, @phone, @address, @account_type, @bio, @profilePicture)
        `);
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to create user', error });
    }
  });

  // Update user
router.put('/:userID', async (req, res) => {
  const { userID } = req.params;
  const { user_name, full_name, email, phone, address } = req.body;

  try {
    const pool = await poolPromise;
    await pool
      .request()
      .input('userID', sql.Int, userID)
      .input('user_name', sql.NVarChar, user_name)
      .input('full_name', sql.NVarChar, full_name)
      .input('email', sql.NVarChar, email)
      .input('phone', sql.NVarChar, phone)
      .input('address', sql.NVarChar, address)
      .query(`
        UPDATE Users
        SET user_name = @user_name, full_name = @full_name, email = @email, phone = @phone, address = @address
        WHERE userID = @userID
      `);
    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update user', error });
  }
});

// Delete user
router.delete('/:userID', async (req, res) => {
  const { userID } = req.params;

  try {
    const pool = await poolPromise;
    await pool
      .request()
      .input('userID', sql.Int, userID)
      .query(`
        DELETE FROM Users WHERE userID = @userID
      `);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete user', error });
  }
});


module.exports = router;
