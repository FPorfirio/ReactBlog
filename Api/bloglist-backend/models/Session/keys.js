const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  alg: String,
  kty: String,
  use: String,
  //x5c: [String],
  kid: String,
  n: String,
  e: String,
  createdAt: { type: Date, default: Date.now, index: { expires: "18m" } },
});

module.exports = mongoose.model("Jwk", schema);
