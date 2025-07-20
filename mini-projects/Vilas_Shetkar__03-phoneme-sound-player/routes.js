const express = require('express');
const { MongoClient } = require('mongodb');
const { savePhonemeActivity } = require('./controllers/phonemeController');
const { registerUser, loginUser } = require('./controllers/userController');
const authMiddleware = require('./middleware/auth');
const cors = require('cors');

const router = express.Router();
router.use(express.json());
router.use(cors());

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/phoneme-sound-player';

async function createRouter() {
    const client = await MongoClient.connect(MONGODB_URI, { useUnifiedTopology: true });
    const db = client.db('phoneme-sound-player');
    console.log('Connected to MongoDB');

    // Attach db to req.app.locals for every request
    router.use((req, res, next) => {
        req.app.locals.db = db;
        next();
    });

    // Routes
    router.post('/phoneme-activity', authMiddleware, savePhonemeActivity);
    router.post('/register', registerUser);
    router.post('/login', loginUser);

    return router;
}

module.exports = createRouter();