const { ObjectId } = require('mongodb');

// filepath: phoneme-sound-player/controllers/phonemeController.js
exports.savePhonemeActivity = async (req, res) => {
    const { word, phonemes, timestamp } = req.body;
    if (!word || !phonemes) return res.status(400).json({ error: 'Missing word or phonemes' });

    try {
        const db = req.app.locals.db;
        if (!db) return res.status(500).json({ error: 'Database not initialized' });

        const activity = {
            
            word,
            phonemes: Array.isArray(phonemes) ? phonemes : [phonemes],
            timestamp: timestamp ? new Date(timestamp) : new Date(),
            userId: new ObjectId(req.user.id) // Store the user ID from the JWT token
        };

        await db.collection('phoneme_activities').insertOne(activity);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: 'Failed to save activity' });
    }
};