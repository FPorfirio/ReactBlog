const BASEURL = process.env.BASEURL;

const defSchema = {
  $id: BASEURL + "/api/models/blogvalidate/defSchema.json",
  definitions: {
    title: { type: "string", maxLength: 100 },
    content: { type: "string", maxLength: 3000 },
    imgUrl: {
      type: "object",
      properties: {
        url: {
          type: "string",
          maxLength: 100,
          pattern: "^https://res.cloudinary.com/dxpdibonp/image/upload/.+",
        },
        public_id: { type: "string", maxLength: 40 },
      },
      required: ["url", "public_id"],
      additionalProperties: false,
    },
    description: {
      type: "string",
      maxLength: 60,
    },
    tags: {
      type: "array",
      uniqueItems: true,
    },
    likes: { type: "number" },
  },
};

const validationPost = {
  $id: BASEURL + "/api/models/blogvalidate/validationPost.json",
  type: "object",
  properties: {
    title: { $ref: "defSchema.json#/definitions/title" },
    imgUrl: { $ref: "defSchema.json#/definitions/imgUrl" },
    content: { $ref: "defSchema.json#/definitions/content" },
    description: { $ref: "defSchema.json#/definitions/description" },
    tags: { $ref: "defSchema.json#/definitions/tags" },
    likes: {
      allOf: [{ $ref: "defSchema.json#/definitions/likes" }, { const: 0 }],
      default: 0,
    },
  },
  required: ["title", "imgUrl", "likes", "content", "tags", "description"],
  additionalProperties: false,
};

const validationPut = {
  $id: BASEURL + "/api/models/blogvalidate/validationPut.json",
  type: "object",
  properties: {
    title: {
      $ref: "defSchema.json#/definitions/title",
    },
    imgUrl: { $ref: "defSchema.json#/definitions/imgUrl" },
    content: { $ref: "defSchema.json#/definitions/content" },
    description: { $ref: "defSchema.json#/definitions/description" },
    tags: { $ref: "defSchema.json#/definitions/tags" },
    likes: {
      allOf: [{ $ref: "defSchema.json#/definitions/likes" }, { const: 1 }],
    },
  },
  additionalProperties: false,
};

module.exports = {
  defSchema,
  validationPost,
  validationPut,
};
