let knex =require('knex')

let sqlite = knex({
  client: 'sqlite3',
  connection: { filename: './sqlite3Db/eCommerce.sqlite' }
})

class SqliteDb {
  static client;
  constructor() {
    if (SqliteDb.client) {
      return SqliteDb.client;
    }
    SqliteDb.client = sqlite;
    this.client = SqliteDb.client;
  }
};

module.exports = new SqliteDb();