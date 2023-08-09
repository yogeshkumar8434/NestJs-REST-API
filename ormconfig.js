
module.exports = {
  'type': 'postgres',
  'host': 'localhost',
  'port': 5432,
  'username': 'postgres',
  'password': 'admin',
  'database': 'usermanagment',
  'entities': [process.env.ENTITY_PATH],
  'synchronize': true,
  'extensions': ['uuid-ossp'],
}