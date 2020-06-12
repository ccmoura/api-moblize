import knex from 'knex';

import knexfile from '../../knexfile';

const env = process.env.NODE_ENV?.trim() || 'development';
const configOptions = env === 'test' ? knexfile.test : env === 'development' ? knexfile.development : knexfile.production;

export default knex(configOptions);
