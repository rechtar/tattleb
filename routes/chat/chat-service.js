const knex = require("../../db/database");
const {
  createError,
  NOT_FOUND,
  BAD_REQUEST,
} = require("../../common/error-utils");
const { ChatThread, ChatMessage } = require("../../models");

const findByUserId = async (userId) => {
  return ChatThread.find({ user_id: userId });
};

const findMessagesByChatId = async (chatId) => {
  return ChatMessage.find({ thread_id: chatId });
};

async function createChat(content, userId) {
  return ChatThread.create({
    user_id: userId,
    content,
  });
}

async function deleteChat(chatId, userId) {
  const entries = await ChatThread.find({ id: chatId, user_id: userId });
  if (entries.length) {
    try {
      await knex.transaction(async (trx) => {
        await trx("chat_messages")
          .where({ thread_id: chatId, user_id: userId })
          .del();
        await trx("chat_threads").where({ id: chatId }).del();
      });
    } catch (error) {
      console.error(error);
      throw createError(500, error.message);
    }
  } else {
    throw createError(400, "user does not own this chat");
  }
}

async function createMessage(content, chatId, userId) {
  return ChatMessage.create({
    user_id: userId,
    thread_id: chatId,
    content,
  });
}

module.exports = {
  findByUserId,
  findMessagesByChatId,
  createChat,
  deleteChat,
  createMessage,
};
