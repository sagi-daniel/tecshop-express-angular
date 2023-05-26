const express = require('express');
const router = express.Router();

const authenticateJWT = require('../../auth/authenticate');
const adminAuth = require('../../auth/adminOnly');

const productController = require('./product.controller');

router.post('/', authenticateJWT, adminAuth, (req, res, next) => {
  return productController.create(req, res, next);
});

router.get('/', (req, res, next) => {
  return productController.findAll(req, res, next);
});

router.get('/:id', (req, res, next) => {
  return productController.findById(req, res, next);
});

router.put('/:id', authenticateJWT, adminAuth, (req, res, next) => {
  return productController.update(req, res, next);
});

router.delete('/:id', authenticateJWT, adminAuth, (req, res, next) => {
  return productController.delete(req, res, next);
});

module.exports = router;
