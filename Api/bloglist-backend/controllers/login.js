const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const loginRouter = require("express").Router();
const User = require("../models/User/user");
const Session = require("../models/Session/session");
const Key = require("../models/Session/keys");
const { ajv } = require("../models/validationSchemas.js");
const config = require("../utils/config");
const mongoose = require("mongoose");
const { nanoid } = require("nanoid");
const generateJWK = require("../utils/generateJWK");
const generateRsa = require("../utils/generateRsa");

loginRouter.post("/", async (request, response, next) => {
  const body = request.body;
  const validate = ajv.getSchema("validateLogin_POST");

  if (!validate) {
    return response.status(401).json({
      error: "invalid username or password",
    });
  }

  const user = await User.findOne({ username: body.username });
  const passwordCorrect =
    user === null
      ? false
      : await bcrypt.compare(body.password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: "invalid username or password",
    });
  }

  const userInfo = {
    name: user.username,
    id: user._id,
  };

  const session = new Session({
    UUID: user._id,
    username: user.username,
  });
  const savedSession = await session.save();
  const refreshTokenOpts = {
    issuer: "http://localhost:3001/login",
    audience: "http://localhost:3001/authorization",
    jwtid: savedSession._id.toString(),
    expiresIn: "7d",
  };
  const refreshToken = jwt.sign({}, config.JWKSECRET, refreshTokenOpts);

  const {
    publicKey,
    privateKey,
    publicKeyComponents: { n: modulus, e: exponent },
  } = generateRsa();
  const keyId = nanoid();
  await Promise.all([publicKey, privateKey, keyId]);

  const key = generateJWK(keyId, publicKey, modulus, exponent);
  const JWK = new Key(key);
  await JWK.save();
  console.log(privateKey);
  const accessTokenBody = {
    scope: user.scopes,
  };
  const accessTokenOptions = {
    algorithm: "RS256",
    issuer: "http://localhost:3001/login",
    audience: "http://localhost:3001/",
    subject: user._id.toString(),
    keyid: keyId,
    expiresIn: "15m",
  };
  const accessToken = jwt.sign(accessTokenBody, privateKey, accessTokenOptions);

  response
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    })
    .status(200)
    .send({ accessToken, userInfo });
});

module.exports = loginRouter;
