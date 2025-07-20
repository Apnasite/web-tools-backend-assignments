const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { createUser, findUserByUsername } = require('../models/userModel');

exports.registerUser = async (req, res) => {
    const { username, password, mobile } = req.body;
    if (!username || !password || !mobile) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    const db = req.app.locals.db;
    const existing = await findUserByUsername(db, username);
    if (existing) {
        return res.status(409).json({ error: 'Username already exists' });
    }
    await createUser(db, { username, password, mobile });
    res.json({ success: true });
};

exports.loginUser = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password required' });
    }
    const db = req.app.locals.db;
    const user = await findUserByUsername(db, username);
    if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
};