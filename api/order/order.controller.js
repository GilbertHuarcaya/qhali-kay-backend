const {
  createOrder,
  deleteOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  getOrderByUser,
} = require('./order.service');

async function getAllOrdersHandler(req, res) {
  try {
    const orders = await getAllOrders();
    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function getOrderByIdHandler(req, res) {
  const { id } = req.params;
  try {
    const order = await getOrderById(id);

    if (!order) {
      return res.status(404).json({ message: `Order not found with id: ${id}` });
    }

    return res.status(200).json(order);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function createOrderHandler(req, res) {
  try {
    const order = await createOrder(req.body);
    return res.status(201).json(order);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function updateOrderHandler(req, res) {
  const { id } = req.params;
  try {
    const order = await updateOrder(id, req.body);

    if (!order) {
      return res.status(404).json({ message: `Order not found with id: ${id}` });
    }

    return res.status(200).json(order);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function deleteOrderHandler(req, res) {
  const { id } = req.params;
  try {
    const order = await deleteOrder(id);

    if (!order) {
      return res.status(404).json({ message: `Order not found with id: ${id}` });
    }

    return res.status(200).json(order);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function getOrderByUserHandler(req, res) {
  const { userId } = req.params;
  try {
    const orders = await getOrderByUser(userId);
    if (!orders) {
      return res.status(404).json({ message: `Order not found with id: ${userId}` });
    }
    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createOrderHandler,
  deleteOrderHandler,
  getAllOrdersHandler,
  getOrderByIdHandler,
  updateOrderHandler,
  getOrderByUserHandler,
};
