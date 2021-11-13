const blogRouter = require("express").Router();
const Blog = require("../models/blog/blog");
const User = require("../models/user/user");
const { ajv } = require("../models/validationSchemas.js");
const middleware = require("../utils/middleware");
const BASEURL = process.env.BASEURL;

blogRouter.get("/", async (request, response, next) => {
  const userId = request.query.userId;
  if (userId) {
    const userPosts = await Blog.find({ user: userId });
    if (userPosts.length) {
      return response.status(200).json(userPosts);
    }

    response.status(404).end();
  }

  const posts = await Blog.find({}).populate("user", { username: 1, name: 1 });

  return response.status(200).json(posts);
});

blogRouter.get("/:id", async (request, response, next) => {
  const post = await Blog.findById(request.params.id).populate("user");
  if (post) {
    return response.json(post);
  }

  return response.status(404).end();
});

blogRouter.post(
  "/",
  middleware.authenticator,
  async (request, response, next) => {
    const body = request.body;
    const userId = request.token.sub.toString();

    const validate = ajv.getSchema("validateBlog_POST");
    if (!validate(body)) {
      console.log(validate.errors);
      return response.status(400).end();
    }

    const blog = new Blog({
      title: body.title,
      author: body.author,
      content: body.content,
      tags: body.tags,
      imgUrl: body.imgUrl,
      likes: [],
      user: userId,
    });
    const saveBlogQuery = blog.save();
    const userQuery = User.findById(userId);
    const [user, savedPost] = await Promise.all([userQuery, saveBlogQuery]);

    user.posts = user.posts.concat(savedPost._id);
    await user.save();

    Blog.populate(savedPost, {
      path: "user",
      select: { username: 1, name: 1 },
    });
    return response.status(201).json(savedPost);
  }
);

blogRouter.put(
  "/:id",
  middleware.authenticator,
  async (request, response, next) => {
    const body = request.body;
    const userId = request.token.sub.toString();
    const id = request.params.id;

    const validate = ajv.getSchema("validateBlog_PUT");
    if (!validate(body)) {
      return response.status(400).end();
    }

    const blog = await Blog.findById(id);

    if (body.hasOwnProperty("likes")) {
      const isDuplicate = blog.likes.some((likeId) => likeId == userId);
      if (!isDuplicate) {
        blog.likes = blog.likes.concat(userId);
        await blog.save();
        return response.status(200).json({ likes: blog.likes.length });
      }

      blog.likes = blog.likes.filter((likeId) => likeId.toString() !== userId);
      await blog.save();

      return response.status(200).json({ likes: blog.likes.length });
    }

    if (body.hasOwnProperty("title")) {
      const checkUser = blog.user.toString() == userId;
      if (checkUser) {
        blog.title = body.title;
        const updatedBlog = await blog.save();

        response.status(200).json(updatedBlog);
      }

      response.status(403).end();
    }
  }
);

blogRouter.delete(
  "/:id",
  middleware.authenticator,
  async (request, response, next) => {
    const userId = request.token.sub.toString();
    const post = await Blog.findById(request.params.id).populate("user");

    if (post?.user.id.toString() === userId) {
      await Blog.findByIdAndDelete(request.params.id);

      response.status(204).end();
    }

    response.status(404).end();
  }
);

/*	const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, body, { new: true })
																	.populate('user', {username: 1, name: 1})
																	.populate('comments')
																	
			await Blog.populate(savedBlog, {path: 'user', select: {username: 1, name: 1}})
			await Blog.populate(savedBlog, {path: 'comments'})
																	
																	*/

module.exports = blogRouter;
