const Ajv = require("ajv");
const {
  defSchema: commentSchema,
  validationPost: commentPost,
  validationPut: commentPut,
} = require("./Comment/commentValidate.js");
const {
  defSchema: loginSchema,
  validationPost: loginPost,
} = require("./Session/sessionValidate.js");
const {
  defSchema: blogSchema,
  validationPost: blogPost,
  validationPut: blogPut,
} = require("./Blog/blogValidate.js");

const ajv = (exports.ajv = new Ajv({
  useDefaults: true,
  removeAdditional: true,
}));

ajv.addSchema(commentSchema);
ajv.addSchema(blogSchema);
ajv.addSchema(loginSchema);
ajv.addSchema(blogPost, "validateBlog_POST");
ajv.addSchema(blogPut, "validateBlog_PUT");
ajv.addSchema(commentPost, "validateComment_POST");
ajv.addSchema(commentPut, "validateComment_PUT");
ajv.addSchema(loginPost, "validateLogin_POST");
