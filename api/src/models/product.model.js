const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    rating: {
      type: Number,
      required: true
    },
    stock: {
      type: Number,
      required: true
    },
    brand: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', ProductSchema);
