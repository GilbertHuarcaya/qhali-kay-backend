const get = require('lodash/get');
const User = require('./user.model');

/**
 * Get all users
 * @returns all users
 */
async function getAllUsers() {
  const users = await User.find();
  return users;
}

/**
 * Get user by id
 * @param {string} id Indentifier of the user to be filtered
 * @returns user
 */
async function getUserById(id) {
  const user = await User.findById(id);
  return user;
}

/**
 * Create a new user
 * @param {Object} user User to create
 * @returns User created
 */

async function createUser(user) {
  const newUser = await User.create(user);
  return newUser;
}

/**
 * Update a user
 * @param {string} id Indentifier of the user to be updated
 * @param {*} user Body of the user to be updated
 * @returns user updated
 */

async function updateUser(id, user) {
  const updatedUser = await User.findByIdAndUpdate(id, user, { new: true });
  return updatedUser;
}

async function addBillingCards(user, card) {
  const creditCards = user?.billing?.creditCards;

  const customer = {
    billing: {
      ...user.billing,
      creditCards: creditCards.push(card)
    },
  };

  const updatedUser = await User.findByIdAndUpdate(user._id, customer, {
    new: true,
  });
  return updatedUser;
}

async function addBilingCustomerId(user, customerId) {
  const creditCards = get(user, 'billing.creditCards', [])

  const customer = {
    billing: {
      creditCards,
      customerId: customerId
    }
  }

  const updatedUser = await User.findByIdAndUpdate(user._id, customer, {
    new: true,
  });

  return updatedUser
}

/**
 * Delete a user
 * @param {String} id Identifier of the user to be deleted
 * @returns User deleted
 */
async function deleteUser(id) {
  const deletedUser = await User.findByIdAndDelete(id);
  return deletedUser;
}

async function getUserByEmail(email) {
  const user = await User.findOne({ email });
  return user;
}

async function getUserByRolePersonal() {
  const users = await User.find({ role: 'personal' });
  return users;
}

async function findOneUser(query) {
  const user = await User.findOne(query);
  return user;
}

module.exports = {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
  getUserByEmail,
  findOneUser,
  addBillingCards,
  addBilingCustomerId,
  getUserByRolePersonal,
};
