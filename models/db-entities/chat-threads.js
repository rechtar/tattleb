"use strict";

const createGuts = require("../model-guts");

const name = "ChatThread";
const tableName = "chat_threads";
const selectableProps = [
  "id",
  "user_id",
  "content",
  "updated_at",
  "created_at",
];

module.exports = (knex) => {
  const guts = createGuts({
    knex,
    name,
    tableName,
    selectableProps,
  });

  return {
    ...guts,
  };
};
