const jwt = require("jsonwebtoken");
const { JWT_KEY } = require("../config");

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    if (!token) {
      return res.status(401).send({ msg: "Access Denied" });
    }
    var payload;
    try {
      payload = jwt.verify(token, JWT_KEY);
    } catch (e) {
      if (e instanceof jwt.JsonWebTokenError) {
        // if the error thrown is because the JWT is unauthorized, return a 401 error
        return res.status(401).end();
      }
      // otherwise, return a bad request error
      return res.status(400).end();
    }
  } catch (err) {
    return res.status(401).send({ msg: `Invalid Token`, ERROR: err });
  }
}; // Check if the JWT didn't expire

module.exports = verifyToken;
