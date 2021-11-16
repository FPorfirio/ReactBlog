const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  UUID: mongoose.Schema.Types.ObjectId,
  username: {
    type: String,
    unique: true,
    required: true,
  },
  createdAt: { type: Date, default: Date.now, index: { expires: "15d" } },
});

module.exports = mongoose.model("Session", sessionSchema);

//        createdAt: { type: Date, expires: 10000, default: Date.now },
