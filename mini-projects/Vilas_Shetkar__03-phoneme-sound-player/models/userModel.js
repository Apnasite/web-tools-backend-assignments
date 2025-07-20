const bcrypt = require('bcrypt');

const USERS_COLLECTION = 'users';

async function createUser(db, { username, password, mobile }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { username, password: hashedPassword, mobile };
    const result = await db.collection(USERS_COLLECTION).insertOne(user);
    return result.insertedId;
}

async function findUserByUsername(db, username) {
    return db.collection(USERS_COLLECTION).findOne({ username });
}

module.exports = {
    createUser,
    findUserByUsername
};