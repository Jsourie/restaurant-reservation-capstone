// Inside your existing migration file
exports.up = function (knex) {
    return knex.schema.createTable("tables", (table) => {
      table.increments("table_id").primary();
      table.string("table_name").notNullable();
      table.integer("capacity").notNullable();
      
      // Add the foreign key column
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
    return knex.schema.alterTable("tables", (table) => {
      // Remove the foreign key column
      table.dropColumn("reservation_id");
    });
  };
  