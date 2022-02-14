const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
      minLength: 2
    },
    precio: {
      type: Number,
      required: true,
      minLength: 2
    }
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Service', ServiceSchema);
