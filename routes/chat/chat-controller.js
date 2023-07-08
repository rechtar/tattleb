const { pipeline } = require("stream");
const fetch = require("node-fetch");
const ChatService = require("./chat-service");

const getChats = async (req, res) => {
  const userId = req.decodedUser.userId || null;
  const threads = await ChatService.findByUserId(userId);

  return res.status(200).send({ ok: true, message: "succeed", data: threads });
};

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

const postChat = async (req, res) => {
  const userId = req.decodedUser.userId || null;
  const content = req.body.content;
  const result = await ChatService.createChat(content, userId);
  // console.log(result);

  return res.status(200).send({ ok: true, message: "succeed", data: result });
};

const deleteChat = async (req, res) => {
  const userId = req.decodedUser.userId || null;
  const chatId = req.params.chatId || null;
  const result = await ChatService.deleteChat(chatId, userId);
  if (!userId || !chatId) {
    return res.status(400).send({
      ok: false,
      message: "chatId and userId must be present",
    });
  }

  return res.status(200).send({ ok: true, message: "succeed", data: result });
};

const getMessages = async (req, res) => {
  const chatId = req.params.chatId || null;
  const messages = await ChatService.findMessagesByChatId(chatId);

  return res.status(200).send({ ok: true, message: "succeed", data: messages });
};

const submitResponse = async (req, res) => {
  const userId = req.decodedUser.userId || null;
  const chatId = req.params.chatId || null;
  const { content } = req.body.content;
  const contentWithRole = {
    content,
    role: "assistant",
  };
  const messages = await ChatService.createMessage(
    contentWithRole,
    chatId,
    userId
  );

  const previousMessages = (await ChatService.findMessagesByChatId(chatId)).map(
    (m) => m.content
  );

  return res
    .status(200)
    .send({ ok: true, message: "succeed", data: previousMessages });
};

const postMessage = async (req, res) => {
  const userId = req.decodedUser.userId || null;
  const chatId = req.params.chatId || null;
  const { content } = req.body.content;
  const contentWithRole = {
    content,
    role: "user",
  };
  const messages = await ChatService.createMessage(
    contentWithRole,
    chatId,
    userId
  );

  const previousMessages = (await ChatService.findMessagesByChatId(chatId)).map(
    (m) => m.content
  );
  // await sleep(5000);
  // console.info(previousMessages.concat(contentWithRole));

  const aiResponse = await fetch("http://tattle.kagome.io/api/ai_respond", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messages: previousMessages.concat(contentWithRole),
    }),
  });
  const jsonified = await aiResponse.json();
  const aiMessage = jsonified.result.choices[0].message;
  const messagesWithResponse = await ChatService.createMessage(
    aiMessage,
    chatId,
    userId
  );

  return res
    .status(200)
    .send({ ok: true, message: "succeed", data: messagesWithResponse });
};

const postMessageStream = async (req, res) => {
  const userId = req.decodedUser.userId || null;
  const chatId = req.params.chatId || null;
  const { content } = req.body.content;
  const contentWithRole = {
    content,
    role: "user",
  };
  const messages = await ChatService.createMessage(
    contentWithRole,
    chatId,
    userId
  );

  const previousMessages = (await ChatService.findMessagesByChatId(chatId)).map(
    (m) => m.content
  );

  try {
    const aiResponse = await fetch(
      "http://tattle.kagome.io/api/ai_respond_v2",
      {
        method: "POST",
        cache: "no-cache",
        keepalive: true,
        headers: {
          Accept: "text/event-stream",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: previousMessages.concat(contentWithRole),
        }),
      }
    );
    pipeline(aiResponse.body, res, (err) => err && console.log(err.message));
    res.writeHead(200);
  } catch (e) {
    console.log(`Error with proxied OpenAI API request: ${e.message}`);
    res.status(500).json({
      error: {
        message: "An error occurred from upstream AI.",
      },
    });
  }
};

module.exports = {
  getChats,
  postChat,
  deleteChat,
  getMessages,
  postMessage,
  postMessageStream,
  submitResponse,
};
