import { Request, Response } from 'express'
import { deleteUser, getUserByEmail, getUserById, updateUser } from '../../api/user/user.service'
import { getHospitalByEmail, updateHospital } from '../../api/hospital/hospital.service'
import { signToken, validateToken } from '../auth.service'
import { DocumentDefinition } from 'mongoose'
import { UserDocument } from '../../api/user/user.model'
import bcrypt from 'bcryptjs'

export async function loginUserHandler (req: Request, res: Response) {
  const { email, password } = req.body
  try {
    const user = await getUserByEmail(email)

    if (!user) {
      return res.status(400).json({
        message: 'Hubo un error, revisa si el email o la contraseña son correctos'
      })
    }

    if (!user.isVerified) {
      return res.status(400).json({
        message: 'Su email no está validado, revise su bandeja de mensajes o spam'
      })
    }

    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      return res.status(400).json({
        message: 'Hubo un error, revisa si el email o la contraseña son correctos'
      })
    }
    const token = signToken(user.profile)

    res.status(200).json({ token })
  } catch (err) {
    res.status(400).json(err)
  }
}

export async function loginHospitalHandler (req: Request, res: Response) {
  const { email, password } = req.body
  try {
    const hospital = await getHospitalByEmail(email)

    if (!hospital) {
      return res.status(400).json({
        message: 'Hubo un error, revisa si el email o la contraseña son correctos'
      })
    }

    if (!hospital.isVerified) {
      return res.status(400).json({
        message: 'Su email no está validado, revise su bandeja de mensajes o spam'
      })
    }

    const isMatch = await hospital.comparePassword(password)
    if (!isMatch) {
      return res.status(400).json({
        message: 'Hubo un error, revisa si el email o la contraseña son correctos'
      })
    }
    const token = signToken(hospital.profile)

    res.status(200).json({ token })
  } catch (err) {
    res.status(400).json(err)
  }
}

export async function changePasswordHospitalHandler (req: Request, res: Response) {
  const { email, password, newPassword } = req.body
  try {
    const hospital = await getHospitalByEmail(email)

    if (!hospital) {
      return res.status(400).json({
        message: 'Hospital not found'
      })
    }

    const isMatch = await hospital.comparePassword(password)
    if (!isMatch) {
      return res.status(400).json({
        message: 'Hubo un error revise nuevamente la contraseña'
      })
    }
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(newPassword, salt)

    const updatedHospital = await updateHospital(hospital.id, { password: hash })

    const token = signToken(updatedHospital.profile)

    res.status(200).json({ token })
  } catch (err) {
    res.status(400).json(err)
  }
}
export async function changePasswordHandler (req: Request, res: Response) {
  const { email, password, newPassword } = req.body
  try {
    const user: DocumentDefinition<UserDocument> | null = await getUserByEmail(email)

    if (!user) {
      return res.status(400).json({
        message: 'User not found'
      })
    }
    if (user && user.id) {
      const isMatch = await user.comparePassword(password)
      if (!isMatch) {
        return res.status(400).json({
          message: 'Hubo un error revise nuevamente la contraseña'
        })
      }
      const salt = await bcrypt.genSalt(10)
      const hash: string = await bcrypt.hash(newPassword, salt)

      const updatedUser: any = await updateUser(user.id, { password: hash })

      const token = signToken(updatedUser.profile)

      res.status(200).json({ token })
    }
  } catch (err) {
    res.status(400).json(err)
  }
}

export async function validateEmaildHandler (req: Request, res: Response) {
  const { userToken } = req.params
  const { id } = req.body
  try {
    const [token] = userToken.split(' ')
    // Validate token
    const payload: any = await validateToken(token)

    if (!payload) {
      const findUser: any = await getUserById(id)
      if (!findUser.isVerified) {
        await deleteUser(id)
        return res.status(401).json({
          message: 'It has been a while since we have seen you, sign up again'
        })
      }
      return res.status(401).json({
        message: 'It has been a while since we have seen you, you are already verified'
      })
    }
    const user: DocumentDefinition<UserDocument> | null = await getUserByEmail(payload.email)

    if (!user) {
      return res.status(400).json({
        message: 'User not found'
      })
    }

    if (user.isVerified) {
      return res.status(400).json({
        message: 'User is already verified'
      })
    }
    if (user && user.id) {
      const updatedUser = await updateUser(user.id, { isVerified: true })

      res.status(200).json(updatedUser)
    }
  } catch (err) {
    res.status(400).json(err)
  }
}

export async function resetPasswordHandler (req: Request, res: Response) {
  const { userToken, password } = req.body
  try {
    const [token] = userToken.split(' ')
    // Validate token
    const payload: any = await validateToken(token)

    if (!payload) {
      return res.status(401).json({
        message: 'It has been a while since we have seen you, request an email again'
      })
    }
    const user: DocumentDefinition<UserDocument> | null = await getUserByEmail(payload.email)

    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      })
    }
    if (user && user.id) {
      const salt = await bcrypt.genSalt(10)
      const hash = await bcrypt.hash(password, salt)

      const updatedUser = await updateUser(user.id, { password: hash })

      res.status(200).json(updatedUser)
    }
  } catch (err) {
    res.status(400).json(console.log(err))
  }
}
