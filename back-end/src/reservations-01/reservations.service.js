// reservations.service.js

const knex = require("../db/connection");

async function listDate(date) {
  try {
    const data = await knex("reservations")
      .select("*")
      .whereRaw('DATE(reservation_date) = ?', date)
      .orderBy("reservation_time");
    return data;
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
  listDate,
  create,
};





