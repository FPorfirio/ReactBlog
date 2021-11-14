require("dotenv").config();

const PORT = process.env.PORT;
const JWKSECRET = process.env.JWKSECRET;
const CORS_OPTS = {
  origin: "https://fporfirio.github.io",
};

let MONGODB_URI = process.env.MONGODB_URI;
if (process.env.NODE_ENV === "test" || process.env.NODE_ENV === "development") {
  console.log("wasup");
  MONGODB_URI = process.env.TEST_MONGODB_URI;
}

module.exports = {
  MONGODB_URI,
  PORT,
  JWKSECRET,
  CORS_OPTS,
};
