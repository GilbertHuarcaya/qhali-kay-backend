const {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
  getUserByEmail,
  getUserByRolePersonal,
} = require('./user.service');

const { verifyAccountEmail, contactUsEmail } = require('../../utils/email.js');
const { verifyEmailToResetPassword } = require('../../utils/email.js');
const { signToken } = require('../../auth/auth.service');

const { log } = require('../../utils/logger');

require('dotenv').config();

async function getAllUsersHandler(req, res) {
  try {
    const users = await getAllUsers();
    return res.status(200).json(users);
  } catch (error) {
    log.error(error);
    return res.status(500).json({ error: error.message });
  }
}

async function getUserByIdHandler(req, res) {
  const { id } = req.params;
  try {
    const user = await getUserById(id);
    if (!user) {
      return res.status(404).json({ message: `User not found with id: ${id}` });
    }
    return res.status(200).json(user);
  } catch (error) {
    log.error(error);
    return res.status(400).json({ error: error.message });
  }
}

async function getUserByEmailHandler(req, res) {
  const { email } = req.params;
  try {
    const user = await getUserByEmail(email);
    if (!user) {
      return res
        .status(404)
        .json({ message: `User not found with email: ${email}` });
    }
    const token = signToken(user.profile);
    return res.status(200).json(token);
  } catch (error) {
    log.error(error);
    return res.status(400).json({ error: error.message });
  }
}

async function sendEmailToUserByEmailHandler(req, res) {
  const { email } = req.body;
  try {
    const user = await getUserByEmail(email);
    if (!user) {
      return res
        .status(404)
        .json({ message: `User not found with email: ${email}` });
    }
    const token = signToken(user.profile)

    await verifyEmailToResetPassword(user, token);

    return res.status(200).json(user);
  } catch (error) {
    log.error(error);
    return res.status(400).json({ error: error.message });
  }
}

async function createUserHandler(req, res) {
  const { email, password, isVerified } = req.body;
  try {
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      if (!existingUser.isVerified && !isVerified) {
        return res.status(400).json({
          message: 'Su email no está validado, revise su bandeja de mensajes o spam',
        });
      }

      if (!existingUser.isVerified && isVerified) {
        const user = await updateUser(existingUser.id, { isVerified });
        return res.status(201).json({ user: user.profile });
      }

      const isMatch = await existingUser.comparePassword(password);

      if (!isMatch) {
        return res.status(400).json({
          message: 'Hubo un error, revisa si el email o la contraseña son correctos',
        });
      }
      const token = signToken(existingUser.profile);

      return res.status(200).json({ token });
    }

    const user = await createUser(req.body);

    const token = signToken(user.profile)

    if (!user.isVerified) {
      await verifyAccountEmail(user, token);
    }

    return res.status(201).json({ user: user.profile });
  } catch (error) {
    return res.status(500).json({ error: error.keyValue });
  }
}

async function updateUserHandler(req, res) {
  const { id } = req.params;
  try {
    const user = await updateUser(id, req.body);

    if (!user) {
      return res.status(404).json({ message: `User not found with id: ${id}` });
    }
    const token = signToken(user.profile);

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function deleteUserHandler(req, res) {
  const { id } = req.params;
  try {
    const user = await deleteUser(id);

    if (!user) {
      return res.status(404).json({ message: `User not found with id: ${id}` });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function getAllPersonalQhalikayHandler(req, res) {
  try {
    const users = await getUserByRolePersonal();
    if (!users) {
      return res
        .status(404)
        .json({ message: 'Users not found' });
    }
    const usersProfile = users.map((user) => { return user.profile })
    console.log(usersProfile)
    return res.status(200).json(usersProfile);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

async function sendContactUsEmailHandler(req, res) {
  const data = req.body
  try {
    await contactUsEmail(data);
    return res.status(200).send(req.body);
  } catch (error) {
    log.error(error);
    return res.status(400).json({ error: error.message });
  }
}

module.exports = {
  createUserHandler,
  deleteUserHandler,
  getAllUsersHandler,
  getUserByIdHandler,
  updateUserHandler,
  getUserByEmailHandler,
  sendEmailToUserByEmailHandler,
  getAllPersonalQhalikayHandler,
  sendContactUsEmailHandler,
};
