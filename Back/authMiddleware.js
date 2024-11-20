const express = require('express');
const { login } = require('./authController');
const { authenticateToken, authorizeRoles } = require('./authMiddleware');

const router = express.Router();

// Route đăng nhập
router.post('/login', login);

// Route dành cho admin
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
