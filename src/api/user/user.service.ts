import get from 'lodash/get';
import User from './user.model';

/**
 * Get all users
 * @returns all users
 */
export async function getAllUsers() {
  const users = await User.find();
  return users;
}

/**
 * Get user by id
 * @param {string} id Indentifier of the user to be filtered
 * @returns user
 */
export async function getUserById(id: any) {
  const user = await User.findById(id);
  return user;
}

/**
 * Create a new user
 * @param {Object} user User to create
 * @returns User created
 */

export async function createUser(user: any) {
  const newUser = await User.create(user);
  return newUser;
}

/**
 * Update a user
 * @param {string} id Indentifier of the user to be updated
 * @param {*} user Body of the user to be updated
 * @returns user updated
 */

export async function updateUser(id: any, user: any) {
  const updatedUser = await User.findByIdAndUpdate(id, user, { new: true });
  return updatedUser;
}

export async function addBillingCards(user: any, card: any) {
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

export async function addBilingCustomerId(user: any, customerId: any) {
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
export async function deleteUser(id: any) {
  const deletedUser = await User.findByIdAndDelete(id);
  return deletedUser;
}

export async function getUserByEmail(email: string) {
  const user = await User.findOne({ email });
  return user;
}

export async function getUserByRolePersonal() {
  const users = await User.find({ role: 'personal' });
  return users;
}

export async function findOneUser(query: any) {
  const user = await User.findOne(query);
  return user;
}

export default {
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
