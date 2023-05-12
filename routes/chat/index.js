const chatController = require("./chat-controller");
const Router = require("express-promise-router");
const router = new Router();
const { authenticate } = require("../../middlewares/authentication");

router.get("/", authenticate, chatController.getChats);
router.post("/", authenticate, chatController.postChat);
router.get("/:chatId", authenticate, chatController.getMessages);
router.post("/:chatId", authenticate, chatController.postMessage);

module.exports = router;
