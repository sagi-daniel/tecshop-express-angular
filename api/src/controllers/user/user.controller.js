const userService = require('./user.service');
const createError = require('http-errors');
const logger = require('../../config/logger');

exports.create = async (req, res, next) => {
  try {
    const savedUser = await userService.create(req.body);
    logger.info(`New user saved`);
    res.status(201).json(savedUser);
  } catch (error) {
    logger.error(error);
    return next(new createError.InternalServerError('User could not saved'));
  }
};

exports.findAll = async (req, res, next) => {
  try {
    const users = await userService.findAll();
    const usersDTO = users.map((u) => ({
      user_id: u._id,
      role: u.role,
      email: u.email,
      userName: u.userName,
      firstName: u.firstName,
      lastName: u.lastName,
      birthYear: u.birthYear,
      phone: u.phone ? u.phone : '',
      cart: u.cart ? u.cart : '',
      orders: u.orders ? u.orders : []
    }));
    logger.info(usersDTO);
    res.status(200).json(usersDTO);
  } catch (error) {
    logger.error(error);
    return next(new createError.InternalServerError('Database error'));
  }
};

exports.findById = async (req, res, next) => {
  const userId = req.params.id;

  logger.info(
    `${new Date().toUTCString}, REQ: ${req.method}, path: ${req.originalUrl}`
  );

  try {
    let user = await userService.findById(userId);
    logger.info(user);
    if (!user) return next(new createError.NotFound('User was not found!'));
    res.status(200).json(user);
  } catch (error) {
    logger.error(error);
    if (error.kind === 'ObjectId') {
      return next(new createError.NotFound('Invalid ObjectId!'));
    }
    return next(new createError.InternalServerError('User not found!'));
  }
};

exports.update = async (req, res, next) => {
  const userId = req.params.id;

  try {
    const updateduser = await userService.update(userId, req.body);
    logger.info(updateduser);
    res.status(200).json(updateduser);
  } catch (error) {
    logger.error(error);
    return next(new createError.InternalServerError('Database error'));
  }
};

exports.delete = async (req, res, next) => {
  const userId = req.params.id;
  try {
    await userService.delete(userId);
    logger.info(userId);
    res.status(200).json('Removed');
  } catch (error) {
    logger.error(error);
    return next(new createError.InternalServerError('User not found!'));
  }
};
