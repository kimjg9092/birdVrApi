const db = require('../src/db');

const clearDatabase = async () => {
  await db.query('DELETE FROM users');
};

const closeDatabase = async () => {
  await db.end();
};

module.exports = {
  clearDatabase,
  closeDatabase,
};