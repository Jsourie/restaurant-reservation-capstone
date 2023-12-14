const knex = require("../db/connection");

async function listDate(date) {
 return knex("reservations")
 .select("*")
.where({ reservation_date: date })
.orderBy("reservations.reservation_time");
}

async function list() {
  try {
    return await knex("reservations").select("*");
  } catch (error) {
    console.error("Error in reservations service:", error);
    throw error; 
  }
}


async function create(reservation) {
  return knex("reservations")
    .insert(reservation)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}

module.exports = {
  list,
  listDate,
  create,
};





