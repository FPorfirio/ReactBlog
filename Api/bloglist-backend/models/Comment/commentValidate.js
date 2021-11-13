const defSchema = {
	$id: 'api/models/comment/commentValidate/defSchema.json',
	definitions: {
			content: { type: 'string', minLength: 5, maxLength: 200},
			blogId: { type: 'string', maxLength: 30}
	} 
}

const validationPost = {
	$id: 'api/models/comment/commentValidate/validationPost.json',
	type: 'object',
	properties: {
		content: {$ref: 'defSchema.json#/definitions/content'},
		blogId: {$ref: 'defSchema.json#/definitions/blogId'}
	},
	additionalProperties: false,
	required: ['content', 'blogId']
}

const validationPut = {
	$id: 'api/models/comment/commentValidate/validationPut.json',
	type: 'object',
	properties: {
		content: {$ref: 'defSchema.json#/definitions/content'},
		blogId: {$ref: 'defSchema.json#/definitions/blogId'}
	},
	aditionalProperties: false,
	required: ['content', 'blogId']
}

module.exports = {
	defSchema,
	validationPost,
	validationPut
}