const express = require('express');
const path = require('path');

const router = express.Router();

// Serve mini-project's public folder
router.use(express.static(path.join(__dirname, 'public')));

// Define routes for the mini-project
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

module.exports = router;
