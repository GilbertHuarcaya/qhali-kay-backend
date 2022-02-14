const {
  createCardToken,
  createCustomer,
  makePayment,
  getAllCustomer,
  getCustomer,
  deleteToken
} = require('./payment.service');
const {
  addBillingCards,
  addBilingCustomerId
} = require('../user/user.service');
const Payment = require('./payment.model');
const { log } = require('../../utils/logger');

async function createCardTokenHandlers(req, res) {
  const { cardNumber, cardExpYear, cardExpMonth, cardCVC } = req.body;

  const creditInfo = {
    'card[number]': cardNumber,
    'card[exp_year]': cardExpYear,
    'card[exp_month]': cardExpMonth,
    'card[cvc]': cardCVC,
  };

  try {
    const { card, id, status } = await createCardToken(creditInfo);

    const user = req.user;

    const creditCard = {
      expMonth: card.exp_month,
      expYear: card.exp_year,
      name: card.name,
      mask: card.mask,
      tokenId: id,
    };

    await addBillingCards(user, creditCard);

    res.status(200).json({ card, id, status });
  } catch (error) {
    log.error(error);
    res.status(500).send({
      message: 'Error al crear el token',
      error,
    });
  }
}

async function createCustomerHandlers(req, res) {
  const user = req.user;
  try {
    const { data } = await createCustomer(user)

    if (!user?.billing?.customerId) {
      await addBilingCustomerId(user, data.customerId)
    }

    return res.status(200).json(data)
  } catch (error) {
    log.error(error)
    res.status(500).send({
      message: 'Error creating the customer',
      error,
    })
  }
}

async function makePaymentHandlers(req, res) {
  try {
    const { user, body: payment } = req;
    const { data, success } = await makePayment(user, payment);

    if (!success) {
      // return res.status(500).send(console.log(data))
      return res.status(500).send({
        message: 'Error to make payment',
        error: data
      })
    }

    await Payment.create({
      userId: user._id,
      refId: data.recibo,
      bill: data.factura,
      description: data.descripcion,
      value: data.valor,
      tax: data.iva,
    });

    return res.status(200).json({ success, data });
  } catch (error) {
    log.error(error);
    res.status(500).send({
      message: 'Error realizando el pago',
      error,
    });
  }
}

async function getCustomerHandlers(req, res) {
  const customerId = req.params;
  try {
    const customer = await getCustomer(customerId.id)
    return res.status(200).json(customer)
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function getAllCustomersHandlers(req, res) {
  try {
    const data = await getAllCustomer()
    return res.status(200).json(data)
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function deleteTokenHandlers(req, res) {
  const { franchise, mask, customerId } = req.body;

  const creditInfo = {
    franchise: franchise,
    mask: mask,
    customer_id: customerId,
  };

  try {
    const { data, success } = await deleteToken(creditInfo);

    if (!success) {
      return res.status(500).send({
        message: 'Error to delete card token',
        error: data
      })
    }

    return res.status(200).json({ success, data })
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createCardTokenHandlers,
  createCustomerHandlers,
  makePaymentHandlers,
  getAllCustomersHandlers,
  getCustomerHandlers,
  deleteTokenHandlers
};
