const { User } = require("../../models");
const { generateToken } = require("../../middlewares/authentication");
const {
  createError,
  NOT_FOUND,
  BAD_REQUEST,
} = require("../../common/error-utils");

const login = async (username, password) => {
  if (!username) {
    throw createError(400, "missing username");
  }
  if (!password) {
    throw createError(400, "missing password");
  }

  const user = await User.getAndVerify(username, password);
  const token = generateToken({ userId: user.id, role: user.role });
  delete user.password;

  return { ...user, token };
};

const register = async ({ username, password, role }) => {
  if (!username) {
    throw createError(400, "missing username");
  }
  if (!password) {
    throw createError(400, "missing password");
  }

  let user = await User.findOne((builder) =>
    builder.where({ username })
  );

  if (user) {
    throw createError(400, "username already exists");
  }
  const result = await User.create({ username, password, role });

  const token = generateToken({
    userId: result[0].id,
    role: result[0].role,
  });

  user = result[0];
  delete user.password;

  return { ...user, token };
};

// --------- support funcs -----------

const getMe = async (userId) => {
  return User.findOne({ id: userId });
};

module.exports = {
  login,
  register,
  getMe,
};
