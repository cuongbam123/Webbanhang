const express = require('express');
const router = express.Router();

router.get('/config', (req, res) => {
    res.status(200).json({
        clientId: process.env.PAYPAL_CLIENT_ID || "sb", // fallback nếu chưa có .env
    });
});

module.exports = router;
