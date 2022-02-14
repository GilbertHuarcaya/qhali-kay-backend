const Order = require('./order.model');

/**
 * Get all orders
 * @returns all orders
 */
async function getAllOrders() {
  const orders = await Order.find();
  return orders;
}

/**
 * Get order by id
 * @param {string} id Indentifier of the order to be filtered
 * @returns order
 */
async function getOrderById(id) {
  const order = await Order.findById(id);
  return order;
}

/**
 * Create a new order
 * @param {Object} order Order to create
 * @returns Order created
 */
async function createOrder(order) {
  const newOrder = new Order(order);
  const savedOrder = await newOrder.save();
  return savedOrder;
}

/**
 * Update a order
 * @param {string} id Indentifier of the order to be updated
 * @param {*} order Body of the order to be updated
 * @returns order updated
 */
async function updateOrder(id, order) {
  const updatedOrder = await Order.findByIdAndUpdate(id, order);
  return updatedOrder;
}

/**
 * Delete a order
 * @param {String} id Identifier of the order to be deleted
 * @returns Order deleted
 */
async function deleteOrder(id) {
  const deletedOrder = await Order.findByIdAndDelete(id);
  return deletedOrder
}

async function getOrderByUser(userId) {
  const order = await Order.find({ userId });
  return order;
}

module.exports = {
  createOrder,
  deleteOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  getOrderByUser,
};
