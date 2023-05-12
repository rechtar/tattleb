/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable("users", (t) => {
      t.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
      t.string("password");
      t.string("username").unique().index();
      t.string("role");
      t.timestamp("created_at").defaultTo(knex.fn.now());
      t.timestamp("updated_at").defaultTo(knex.fn.now());
    })
    .createTable("chat_threads", (t) => {
      t.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
      t.uuid("user_id");
      t.foreign("user_id").references("id").inTable("users");
      t.jsonb("content");
      t.timestamp("created_at").defaultTo(knex.fn.now());
      t.timestamp("updated_at").defaultTo(knex.fn.now());
    })
    .createTable("chat_messages", (t) => {
      t.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
      t.uuid("user_id");
      t.foreign("user_id").references("id").inTable("users");
      t.uuid("thread_id");
      t.foreign("thread_id").references("id").inTable("chat_threads");
      t.jsonb("content");
      t.timestamp("created_at").defaultTo(knex.fn.now());
      t.timestamp("updated_at").defaultTo(knex.fn.now());
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTable("chat_messages")
    .dropTable("chat_threads")
    .dropTable("users");
};
