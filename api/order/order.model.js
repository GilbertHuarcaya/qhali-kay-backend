const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema(
  {
    precio: {
      type: Number,
      required: true,
    },
    service: [
      {
        _id: mongoose.Schema.Types.ObjectId,
        precio: Number,
        name: String,
        cantidad: {
          type: Number,
          required: true,
        },
      },
    ],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    clensId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    userName: {
      type: String,
      ref: 'User',
      required: true,
    },
    horasPorServicio: {
      type: Number,
      required: true,
    },
    incluirProductos: {
      type: String,
      required: true,
    },
    distrito: {
      type: String,
      uppercase: true,
      required: true,
    },
    comentarioIngresoAlLugar: {
      type: String,
      uppercase: true,
    },
    ingresoAlLugar: {
      type: String,
      uppercase: true,
      required: true,
    },
    fecha: {
      day: {
        type: String,
        required: true,
      },
      dayNumber: {
        type: Number,
        required: true,
      },
      month: {
        type: String,
        required: true,
      },
      date: {
        type: String,
        required: true,
      },
    },
    horaLlegada: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      lowercase: true,
      required: true,
    },
    nombre: {
      type: String,
      uppercase: true,
      required: true,
    },
    telefono: {
      type: Number,
      required: true,
    },
    direccion: {
      type: String,
      uppercase: true,
      required: true,
    },
    comentariosDeDireccion: {
      type: String,
      uppercase: true,
    },
    ciudad: {
      type: String,
      uppercase: true,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    reviewed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Order', OrderSchema);
