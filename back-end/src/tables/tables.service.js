const knex = require("../db/connection");



async function list() {
  try {
    return await knex("tables").select("*");
  } catch (error) {
    console.error("Error in tables service:", error);
    throw error; 
  }
}


async function create(table) {
  return knex("tables")
    .insert(table)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}

module.exports = {
  list,
  create,
};

