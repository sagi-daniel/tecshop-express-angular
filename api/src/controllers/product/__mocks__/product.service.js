const productService = jest.mock('./user.service');
const Product = require('../../../models/product.model');

let mockData;

productService.create = jest.fn((product) => {
  product.id = '6425bd8dc85edac93831693c';
  mockData.push(product);
  return Promise.resolve(product);
});

productService.findById = jest.fn((id) => {
  return Promise.resolve(mockData.find((p) => p.id === id));
});

productService.__setMockData = (data) => {
  mockData = data;
};

module.exports = productService;
