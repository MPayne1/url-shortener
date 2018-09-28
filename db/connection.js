const monk = require('monk');
const connectionURL = process.env.MONGODB_URI || 'localhost/url-shortener';
const db = monk(connectionURL);

module.exports = db;
