require("dotenv").config();
const jwt = require("jsonwebtoken");
const UserModel = require("../model/user.model");

module.exports =
  (userRole = "teacher") =>
  async (req, res, next) => {
    try {
      const token =
        req.headers["Authorization"] || req.headers["authorization"];

      if (!token) return res.status(401).send("you are not authorized");

      if (token.indexOf("Bearer") !== 0)
        return res.status(400).send("token format invalid");

      const tokenString = token.split(" ")[1];

      const verified = jwt.verify(tokenString, process.env.TOKEN_SECRET);

      req.user = verified;

      const userInDB = await UserModel.findById(verified["_id"]);

      const roleAuthority = {
        admin: 100,
        teacher: 10,
      };

      if (roleAuthority[userInDB.role] >= roleAuthority[userRole])
        return next();
      else return res.status(401).send("you are not authorized");
    } catch (error) {
      res.status(400).send("invalid token");
    }
  };
