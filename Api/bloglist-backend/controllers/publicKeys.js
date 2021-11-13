const keysRouter = require('express').Router()
const Key = require('../models/session/keys')

keysRouter.get('/', async (request, response, next) => {
    const keys = await Key.find({})
    response.status(201).json({keys})
})

module.exports = keysRouter