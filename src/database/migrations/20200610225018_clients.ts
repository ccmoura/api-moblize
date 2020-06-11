import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('clients', table => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('cpf_cnpj', 14).notNullable();
    table.string('birth_date').notNullable();
    table.string('zipcode', 8).notNullable(); // CEP
    table.string('uf', 2).notNullable();
    table.string('city').notNullable();
    table.string('public_area').notNullable();  // logradouro
    table.integer('number').notNullable();
    table.string('complement');
    table.string('email').notNullable();
    table.string('password').notNullable();
    table.timestamps();
  });
}


export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('clients');
}

