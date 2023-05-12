const ChatService = require("./chat-service");

const getChats = async (req, res) => {
  const userId = req.decodedUser.userId || null;
  const threads = await ChatService.findByUserId(userId);

  return res.status(200).send({ ok: true, message: "succeed", data: threads });
};

const postChat = async (req, res) => {
  const userId = req.decodedUser.userId || null;
  const content = req.body.content;
  const result = await ChatService.createChat(content, userId);
  console.log(result);

  return res.status(200).send({ ok: true, message: "succeed", data: result });
};

const getMessages = async (req, res) => {
  const chatId = req.params.chatId || null;
  const messages = await ChatService.findMessagesByChatId(chatId);

  return res.status(200).send({ ok: true, message: "succeed", data: messages });
};

const postMessage = async (req, res) => {
  const userId = req.decodedUser.userId || null;
  const chatId = req.params.chatId || null;
  const content = req.body.content;
  const messages = await ChatService.createMessage(content, chatId, userId);

  return res.status(200).send({ ok: true, message: "succeed", data: messages });
};

module.exports = {
  getChats,
  postChat,
  getMessages,
  postMessage,
};
