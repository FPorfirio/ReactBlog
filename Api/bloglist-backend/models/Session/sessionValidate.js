const defSchema = {
  $id: "api/models/session/sessionValidate/defSchema.json",
  definitions: {
    username: {
      type: "string",
      minLength: 5,
      maxLength: 12,
      pattern: "^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$",
    },
    password: {
      type: "string",
      minLength: 6,
      maxLength: 14,
      pattern:
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%?&])[A-Za-zd$@$!%?&]+",
    },
  },
};

const validationPost = {
  $id: "api/models/session/sessionValidate/validatePost.json",
  type: "object",
  properties: {
    username: {
      type: "string",
      minLength: 5,
      maxLength: 12,
      pattern: "^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$",
    },
    password: {
      type: "string",
      minLength: 6,
      maxLength: 14,
      pattern:
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%?&])[A-Za-zd$@$!%?&]+",
    },
  },
  required: ["username", "password"],
  additionalProperties: false,
};

module.exports = {
  defSchema,
  validationPost,
};
