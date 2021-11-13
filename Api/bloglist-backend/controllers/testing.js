const router = require("express").Router();
const Blog = require("../models/Blog/blog");
const User = require("../models/User/user");

router.post("/reset", async (request, response) => {
  await Blog.deleteMany({});
  await User.deleteMany({});
  response.status(204).end();
});

module.exports = router;
