import { DocumentDefinition } from 'mongoose'
import User, { UserDocument } from './user.model'

/**
 * Get all users
 * @returns all users
 */
export async function getAllUsers () {
  const users = await User.find()
  return users
}

/**
 * Get user by id
 * @param {string} id Indentifier of the user to be filtered
 * @returns user
 */
export async function getUserById (id: string) {
  const user = await User.findById(id)
  return user
}

/**
 * Create a new user
 * @param {Object} user User to create
 * @returns User created
 */

export async function createUser (input: DocumentDefinition<UserDocument>) {
  const newUser = await User.create(input)
  return newUser
}

/**
 * Update a user
 * @param {string} id Indentifier of the user to be updated
 * @param {*} user Body of the user to be updated
 * @returns user updated
 */

export async function updateUser (id: string, input: DocumentDefinition<UserDocument>) {
  const updatedUser = await User.findByIdAndUpdate(id, input, { new: true })
  return updatedUser
}

/**
 * Delete a user
 * @param {String} id Identifier of the user to be deleted
 * @returns User deleted
 */
export async function deleteUser (id: string) {
  const deletedUser = await User.findByIdAndDelete(id)
  return deletedUser
}

export async function getUserByEmail (email: string) {
  const user = await User.findOne({ email })
  return user
}

export async function getUserByRolePersonal () {
  const users = await User.find({ role: 'personal' })
  return users
}

export async function findOneUser (query: any) {
  const user = await User.findOne(query)
  return user
}
