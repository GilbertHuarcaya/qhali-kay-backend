require('dotenv').config();
const get = require('lodash/get');

const epayco = require('epayco-sdk-node')({
  apiKey: process.env.E_PublicKey,
  privateKey: process.env.E_PrivateKey,
  lang: 'ES',
  test: true
})

async function createCardToken(data) {
  return await epayco.token.create(data)
}

async function getCustomer(customerId) {
  const customer = await epayco.customers.get(customerId);
  return customer
}

async function getAllCustomer() {
  return await epayco.customers.list()
}

async function deleteToken(data) {
  return epayco.customers.delete(data)
}

async function createCustomer(user) {
  const lastTokenCard = user?.billing?.creditCards.slice(-1)[0]

  const customerInfo = {
    token_card: lastTokenCard.tokenId,
    name: user.firstName,
    last_name: user.lastName,
    email: user.email,
    default: true,
    address: user.direccion,
    cell_phone: user.telefono
  };

  const customerInfoCreated = {
    token_card: lastTokenCard.tokenId,
    customer_id: (user?.billing?.customerId),
  }

  if (!user?.billing?.customerId) {
    return epayco.customers.create(customerInfo)
  }

  if (user?.billing?.customerId) {
    return epayco.customers.addNewToken(customerInfoCreated)
  }
}

async function makePayment(user, payment) {
  const lastTokenCard = user?.billing?.creditCards.slice(-1)[0];
  const tokenCardFront = get(payment, 'tokenId')

  let tokenCard

  if (tokenCardFront === '') {
    tokenCard = lastTokenCard.tokenId
  }
  if (tokenCardFront !== '') {
    tokenCard = tokenCardFront
  }

  const paymentInfo = {
    token_card: tokenCard,
    customer_id: get(user, 'billing.customerId'),
    doc_type: 'CC',
    doc_number: '10358519',
    name: get(payment, 'firstName', user.firstName),
    last_name: get(payment, 'lastName', user.lastName),
    email: get(payment, 'email', user.email),
    city: get(payment, 'city'),
    address: get(payment, 'address'),
    phone: get(payment, 'phone'),
    cell_phone: get(payment, 'cellPhone'),
    bill: 'OR-1234',
    description: 'Clens Payment',
    value: get(payment, 'value'),
    tax: '1600',
    tax_base: '10000',
    currency: 'COP',
    dues: '12',
    ip: '190.000.000.000',
    use_default_card_customer: true,
  };

  return await epayco.charge.create(paymentInfo);
}

module.exports = {
  createCardToken,
  createCustomer,
  makePayment,
  getAllCustomer,
  getCustomer,
  deleteToken
};
