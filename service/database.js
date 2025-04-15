const { MongoClient } = require("mongodb");
const config = require("./dbConfig.json");

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db("groupify");
const userCollection = db.collection("user");
const eventCollection = db.collection("event");

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
    try {
        await db.command({ ping: 1 });
        console.log(`Connect to database`);
    } catch (ex) {
        console.log(
            `Unable to connect to database with ${url} because ${ex.message}`,
        );
        process.exit(1);
    }
})();

function getUser(username) {
    return userCollection.findOne({ username: username });
}

function getUserByToken(token) {
    return userCollection.findOne({ token: token });
}

async function addUser(user) {
    await userCollection.insertOne(user);
}

async function updateUser(user) {
    await userCollection.updateOne({ username: user.username }, { $set: user });
}

// Generates random 5 digit code.
function generateCode() {
  return Math.floor(10000 + Math.random() * 90000).toString();
}

async function createEvent(user, groupifyEvent) {
    const newEvent = {
        user: user.username,
        name: groupifyEvent.name,
        code: generateCode(),
        concluded: groupifyEvent.concluded,
        groups: [],
        settings: {
            groupCapacity: groupifyEvent.groupCapacity,
            entryMessage: "Welcome to "+groupifyEvent.name,
        },
    }
    await eventCollection.insertOne(newEvent)
}

async function getEventsByUser(user) {
    const cursor = eventCollection.find({ user: user.username })
    return await cursor.toArray()
}

async function getEventByCode(user, code) {
    return eventCollection.findOne({user: user.username, code: code})
}

module.exports = {
    getUser,
    getUserByToken,
    addUser,
    updateUser,
    createEvent,
    getEventsByUser,
    getEventByCode,
};
