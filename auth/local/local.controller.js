const { deleteUser } = require('../../api/user/user.service');
const { getUserByEmail } = require('../../api/user/user.service');
const { getHospitalByEmail } = require('../../api/hospital/hospital.service');
const { getUserById } = require('../../api/user/user.service');
const { updateUser } = require('../../api/user/user.service');
const { updateHospital } = require('../../api/hospital/hospital.service');
const { signToken } = require('../auth.service');
const { validateToken } = require('../auth.service');
const bcrypt = require('bcryptjs');

async function loginUserHandler(req, res) {
  const { email, password } = req.body;
  try {
    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(400).json({
        message: 'Hubo un error, revisa si el email o la contraseña son correctos',
      });
    }

    if (!user.isVerified) {
      return res.status(400).json({
        message: 'Su email no está validado, revise su bandeja de mensajes o spam',
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({
        message: 'Hubo un error, revisa si el email o la contraseña son correctos',
      });
    }
    const token = signToken(user.profile);

    res.status(200).json({ token });
  } catch (err) {
    res.status(400).json(err);
  
}

async function loginHospitalHandler(req, res) {
  const { email, password } = req.body;
  try {
    const hospital = await getHospitalByEmail(email);

    if (!hospital) {
      return res.status(400).json({
        message: 'Hubo un error, revisa si el email o la contraseña son correctos',
      });
    }

    if (!hospital.isVerified) {
      return res.status(400).json({
        message: 'Su email no está validado, revise su bandeja de mensajes o spam',
      });
    }

    const isMatch = await hospital.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({
        message: 'Hubo un error, revisa si el email o la contraseña son correctos',
      });
    }
    const token = signToken(hospital.profile);

    res.status(200).json({ token });
  } catch (err) {
    res.status(400).json(err);
  }
}

async function changePasswordHospitalHandler(req, res) {
  const { email, password, newPassword } = req.body;
  try {
    const hospital = await getHospitalByEmail(email);

    if (!hospital) {
      return res.status(400).json({
        message: 'Hospital not found',
      });
    }

    const isMatch = await hospital.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({
        message: 'Hubo un error revise nuevamente la contraseña',
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newPassword, salt);

    const updatedHospital = await updateHospital(hospital.id, { password: hash });

    const token = signToken(updatedHospital.profile);

    res.status(200).json({ token });
  } catch (err) {
    res.status(400).json(err);
  }
}
async function changePasswordHandler(req, res) {
  const { email, password, newPassword } = req.body;
  try {
    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(400).json({
        message: 'User not found',
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({
        message: 'Hubo un error revise nuevamente la contraseña',
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newPassword, salt);

    const updatedUser = await updateUser(user.id, { password: hash });

    const token = signToken(updatedUser.profile);

    res.status(200).json({ token });
  } catch (err) {
    res.status(400).json(err);
  }
}

async function validateEmaildHandler(req, res) {
  const { userToken } = req.params;
  const { id } = req.body;
  try {
    const [token] = userToken.split(' ');
    // Validate token
    const payload = await validateToken(token);

    if (!payload) {
      const findUser = await getUserById()
      if (!findUser.isVerified) {
        await deleteUser(id)
        return res.status(401).json({
          message: 'It has been a while since we have seen you, sign up again',
        });
      }
      return res.status(401).json({
        message: 'It has been a while since we have seen you, you are already verified',
      });
    }
    const user = await getUserByEmail(payload.email);

    if (!user) {
      return res.status(400).json({
        message: 'User not found',
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        message: 'User is already verified',
      });
    }

    const updatedUser = await updateUser(user.id, { isVerified: true });

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function resetPasswordHandler(req, res) {
  const { userToken, password } = req.body;
  try {
    const [token] = userToken.split(' ');
    // Validate token
    const payload = await validateToken(token);

    if (!payload) {
      return res.status(401).json({
        message: 'It has been a while since we have seen you, request an email again',
      });
    }
    const user = await getUserByEmail(payload.email);

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const updatedUser = await updateUser(user.id, { password: hash });

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(400).json(console.log(err));
  }
}

module.exports = {
  loginUserHandler,
  changePasswordHandler,
  validateEmaildHandler,
  resetPasswordHandler,
  loginHospitalHandler,
  changePasswordHospitalHandler,
};
