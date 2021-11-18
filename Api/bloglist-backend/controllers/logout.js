const config = require("../utils/config");
const jwt = require("jsonwebtoken");
const Session = require("../models/Session/session");
const logoutRouter = require("express").Router();

logoutRouter.post("/", async (req, response, next) => {
  const refreshToken = req.cookies.refreshToken;
  console.log("the cookie is", refreshToken);
  const decodedToken = jwt.verify(refreshToken, config.JWKSECRET, {
    algorithm: ["HS256"],
    issuer: [
      "http://localhost:3001/authorization",
      "http://localhost:3001/login",
    ],
    audience: "http://localhost:3001/authorization",
  });

  const user = await Session.findById(decodedToken.jti);

  if (user) {
    await Session.findByIdAndDelete(decodedToken.jti);
    response
      .cookie("refreshToken", "", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 0,
      })
      .status(200)
      .end();
    return;
  } else {
    response.status(401).json({ error: "Unauthorized" });
  }
});

module.exports = logoutRouter;
