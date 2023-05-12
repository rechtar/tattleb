const Router = require("express-promise-router");
const router = new Router();
const userRoutes = require("./user");
const chatRoutes = require("./chat");

router.use("/api/user", userRoutes);
router.use("/api/chat", chatRoutes);

module.exports = () => router;
