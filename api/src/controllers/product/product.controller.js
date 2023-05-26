const productService = require('./product.service');
const createError = require('http-errors');
const logger = require('../../config/logger');

exports.create = async (req, res, next) => {
  try {
    const savedProduct = await productService.create(req.body);
    logger.info(`New product saved`);
    res.status(201).json(savedProduct);
  } catch (error) {
    logger.error(error);
    return next(new createError.InternalServerError('Product could not saved'));
  }
};

exports.findAll = async (req, res, next) => {
  try {
    let product = await productService.findAll();
    logger.info(product);
    res.status(200).json(product);
  } catch (error) {
    logger.error(error);
    return next(new createError.InternalServerError('Database error'));
  }
};

exports.findById = async (req, res, next) => {
  const productId = req.params.id;
  logger.info(
    `${new Date().toUTCString}, REQ: ${req.method}, path: ${req.originalUrl}`
  );

  try {
    let product = await productService.findById(productId);
    logger.info(product);
    product = product ? product : {};
    res.status(200).json(product);
  } catch (error) {
    logger.error(error);
    return next(new createError.InternalServerError('User not found!'));
  }
};

exports.update = async (req, res, next) => {
  const productId = req.params.id;

  try {
    const updatedProduct = await productService.update(productId, req.body);
    logger.info(updatedProduct);
    res.status(200).json(updatedProduct);
  } catch (error) {
    logger.error(error);
    return next(new createError.InternalServerError('Database error'));
  }
};

exports.delete = async (req, res, next) => {
  const productId = req.params.id;
  try {
    let product = await productService.delete(productId);
    logger.info(product);
    product = product ? product : {};
    res.status(200).json('Removed');
  } catch (error) {
    logger.error(error);
    return next(new createError.InternalServerError('Product not found!'));
  }
};
