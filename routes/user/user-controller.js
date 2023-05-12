const UserService = require("./user-service");

const login = async (req, res) => {
  const { username, password } = req.body || {};
  const user = await UserService.login(username, password);

  return res.status(200).send({ ok: true, message: "succeed", data: user });
};

const register = async (req, res) => {
  const { username, password, role = "" } = req.body || {};
  const user = await UserService.register({ username, password, role });

  return res.status(201).send({ ok: true, message: "created", data: user });
};

const update = async (req, res) => {
  const props = req.body || {};
  const requestUser = req.decodedUser;

  const user = await UserService.update(requestUser.userId, props);

  return res.status(200).send({ ok: true, message: "succeed", data: user });
};

const getById = async (req, res) => {
  const userId = req.params.userId || {};

  const user = await UserService.getById(userId, userId);

  return res.status(200).send({ ok: true, message: "succeed", data: user });
};

const getUserStories = async (req, res) => {
  const userId = req.params.userId || {};
  const stories = await storyService.getById(userId, userId);

  return res.status(200).send({ ok: true, message: "succeed", data: stories });
};

const getUserTrips = async (req, res) => {
  const userId = req.params.userId || {};
  const trips = (await tripService.getByUserId(userId)) || [];

  return res.status(200).send({ ok: true, message: "succeed", data: trips });
};

module.exports = {
  login,
  register,
  update,
  getById,
  // getUserStories,
  // getUserTrips,
};
