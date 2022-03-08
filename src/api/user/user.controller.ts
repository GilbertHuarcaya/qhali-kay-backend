import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
  getUserByEmail,
  getUserByRolePersonal,
} from './user.service';
import { Request, Response } from 'express';
import { contactUsEmail } from '../../utils/email';
import { verifyEmailToResetPassword } from '../../utils/email';
import { signToken } from '../../auth/auth.service';

import log from '../../utils/logger';

require('dotenv').config();

export async function getAllUsersHandler(req: Request, res: Response) {
  try {
    const users = await getAllUsers();
    return res.status(200).json(users);
  } catch (error: any) {
    log.error(error);
    return res.status(500).json({ error: error.message });
  }
}

export async function getUserByIdHandler(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const user = await getUserById(id);
    if (!user) {
      return res.status(404).json({ message: `User not found with id: ${id}` });
    }
    return res.status(200).json(user);
  } catch (error: any) {
    log.error(error);
    return res.status(400).json({ error: error.message });
  }
}

export async function getUserByEmailHandler(req: Request, res: Response) {
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
  } catch (error: any) {
    log.error(error);
    return res.status(400).json({ error: error.message });
  }
}

export async function sendEmailToUserByEmailHandler(req: Request, res: Response) {
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
  } catch (error: any) {
    log.error(error);
    return res.status(400).json({ error: error.message });
  }
}

export async function createUserHandler(req: Request, res: Response) {
  const { email, password, isVerified } = req.body;
  try {
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      if (!existingUser.isVerified && !isVerified) {
        return res.status(400).json({
          message: 'email not verified, check your messages or spam',
        });
      }

      if (!existingUser.isVerified && isVerified) {
        const user: any = await updateUser(existingUser.id, { isVerified });
        const token = signToken(user.profile);
        return res.status(200).json({ token });
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
      return res.status(400).json({
        message: 'email not verified, check your messages or spam',
      });
    }

    return res.status(201).json({ user: user.profile, token });
  } catch (error: any) {
    return res.status(500).json({ error: error.keyValue });
  }
}

export async function updateUserHandler(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const user = await updateUser(id, req.body);

    if (!user) {
      return res.status(404).json({ message: `User not found with id: ${id}` });
    }
    const token = signToken(user.profile);

    return res.status(200).json({ token });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}

export async function deleteUserHandler(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const user = await deleteUser(id);

    if (!user) {
      return res.status(404).json({ message: `User not found with id: ${id}` });
    }

    return res.status(200).json(user);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}

export async function getAllPersonalQhalikayHandler(req: Request, res: Response) {
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
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
}

export async function sendContactUsEmailHandler(req: Request, res: Response) {
  const data = req.body
  try {
    await contactUsEmail(data);
    return res.status(200).send(req.body);
  } catch (error: any) {
    log.error(error);
    return res.status(400).json({ error: error.message });
  }
}

export default {
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
