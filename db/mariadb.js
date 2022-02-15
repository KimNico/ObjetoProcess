let knex = require('knex');

let mariadb =knex ({
  client: 'mysql',
  connection: {
    host: 'localhost',
    user: 'root',
    password: 'root1234',
    database: 'clasecoder',
  },
  pool:{ min: 0, max: 7 }
});

class MariaDb {
  static client;
  constructor() {
    if (MariaDb.client) {
      return MariaDb.client;
    }
    MariaDb.client = mariadb;
    this.client = MariaDb.client;
  }
};

module.exports =  new MariaDb();