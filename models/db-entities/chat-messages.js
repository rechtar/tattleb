"use strict";

const createGuts = require("../model-guts");

const name = "ChatMessage";
const tableName = "chat_messages";
const selectableProps = [
  "id",
  "user_id",
  "thread_id",
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
