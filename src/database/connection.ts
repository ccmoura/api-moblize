import knex from 'knex';

import knexfile from '../../knexfile.ts';


const env = process.env.NODE_ENV?.trim() || 'development';
const configOptions = knexfile[env];

module.exports = knex(configOptions);
