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

module.exports = router;
