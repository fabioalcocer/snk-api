const createError = require('http-errors');
const debug = require('debug')('app:module-users-controller');

const { UsersService } = require('./services');
const { Response } = require('../common/response');

module.exports.UsersController = {
  getUsers: async (req, res) => {
    try {
      let users = await UsersService.getAll()
      Response.success(res, 200, "List of users", users)
    }
    catch (error) {
      debug(error)
      Response.error(res)
    }
  },

  getUser: async (req, res) => {
    try {
      const { params: { id } } = req
      let user = await UsersService.getById(id)
      
      if(!user) {
        Response.error(res, new createError.NotFound())
      } else {
        Response.success(res, 200, `User ${id}`, user)
      }
    }
    catch (error) {
      debug(error)
      Response.error(res)
    }
  },

  createUser: async (req, res) => {
    try {
      const { body } = req

      if (!body || Object.keys(body).length === 0) {
        Response.error(res, new createError.BadRequest())
      }

      const insertedId = await UsersService.create(body)
      Response.success(res, 201, 'User created successfully', insertedId)
    }
    catch (error) {
      debug(error)
      Response.error(res)
    }
  },
}