exports.up = function (knex) {
    return knex.schema.table("tables", (table) => {
      table
        .integer("reservation_id")
        .unsigned()
        .references("reservation_id")
        .inTable("reservations")
        .onDelete("SET NULL")
        .index();
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.table("tables", (table) => {
      table.dropColumn("reservation_id");
    });
  };
  