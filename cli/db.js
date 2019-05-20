const Promise = require('bluebird');
const sqlite = require('sqlite');

const dbPromise = sqlite.open(__dirname+'/../db/wizards.sqlite', { Promise })
  .then(db => db.migrate({ force: 'last', migrationsPath : __dirname+'/../db/migrations' }));

module.exports = dbPromise;
