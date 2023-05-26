const Product = require('../../models/product.model');

exports.create = (product) => {
  const newProduct = new Product(product);
  return newProduct.save();
};

exports.findAll = () => Product.find();

exports.findById = (id) => Product.findById(id);

exports.update = (id, productData) =>
  Product.findByIdAndUpdate(id, productData, { new: true });

exports.delete = (id) => Product.findByIdAndRemove(id);
