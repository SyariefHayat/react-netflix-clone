const { User } = require("../models/index.model");
const { ERR } = require("./response");

const checkToken = async (req, res, next) => {
  const email = req.body.email || req.params.email;
  const token = req.body.token || req.params.token;

  if (!email || !token) {
    return ERR(res, 400, "Error, No Data Provided");
  }

  try {
    const user = await User.findOne({ email, token });
    if (!user) {
      return ERR(res, 401, "Error, Unauthorized");
    }
    req.user = user;
    next();
  } catch (error) {
    return ERR(res, 500, "Error, Internal Server Error");
  }
};

module.exports = { checkToken };
