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
  createMessage,
};
