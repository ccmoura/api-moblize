require('dotenv').config();
import path from 'path';

export default {
  development: {
    client: 'postgresql',
    connection: process.env.DB_URL?.trim(),
    migrations: {
      directory: path.join(__dirname, 'src', 'database', "migrations"),
    },
    seeds: { directory: path.join(__dirname, 'src', 'database', "seeds") },
  },

  test: {
    client: 'postgresql',
    connection: process.env.DB_URL?.trim(),
    migrations: {
      directory: path.join(__dirname, 'src', 'database', "migrations"),
    },
    seeds: { directory: path.join(__dirname, 'src', 'database', "seeds") },
  },

  production: {
    client: 'postgresql',
    connection: process.env.DB_URL?.trim(),
    migrations: {
      directory: path.join(__dirname, 'src', 'database', "migrations"),
    },
    seeds: { directory: path.join(__dirname, 'src', 'database', "seeds") },
  },
};
