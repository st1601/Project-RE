const express = require('express');
const { login } = require('./authController');

const router = express.Router();

// Đăng nhập
router.post('/login', login);
router.get(
    '/admin',
    authenticateToken,
    authorizeRoles('admin'),
    (req, res) => {
        res.send('Chào mừng Admin!');
    }
);

// Route dành cho artist
router.get(
    '/artist',
    authenticateToken,
    authorizeRoles('artist'),
    (req, res) => {
        res.send('Chào mừng Artist!');
    }
);

// Route dành cho listener
router.get(
    '/listener',
    authenticateToken,
    authorizeRoles('listener'),
    (req, res) => {
        res.send('Chào mừng Listener!');
    }
);

module.exports = router;
