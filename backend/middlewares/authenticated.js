const { verify } = require("../helpers/token");
const User = require("../models/User");

module.exports = async function(req, res, next) {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.status(401).send({ error: "Необходима авторизация" });
      return;
    }
    const tokenData = verify(token);
    const user = await User.findOne({ _id: tokenData.id });
    if (!user) {
      res.status(401).send({ error: "Пользователь не найден" });
      return;
    }
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({ error: "Недействительный токен" });
  }
}