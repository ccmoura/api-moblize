require('dotenv').config();

module.exports = {
  development: {
    client: 'postgresql',
    connection: process.env.DB_URL?.trim(),
    migrations: {
      directory: './src/database/migrations',
    },
    seeds: { directory: './src/database/seeds' },
  },

  testing: {
    client: 'postgresql',
    connection: {
      host: 'localhost',
      database: 'moblizedb',
      user: 'root',
      password: 'root',
    },
    migrations: {
      directory: './src/database/migrations',
    },
    seeds: { directory: './src/database/seeds' },
  },

  production: {
    client: 'postgresql',
    connection: {
      host: 'localhost',
      database: 'moblizedb',
      user: 'root',
      password: 'root',
    },
    migrations: {
      directory: './src/database/migrations',
    },
    seeds: { directory: './src/database/seeds' },
  },
};
