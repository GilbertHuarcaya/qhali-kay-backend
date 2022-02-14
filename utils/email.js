const nodemailer = require('nodemailer');
const { templateVerifyEmail } = require('./templateVerifyEmail.js')
const { templateVerifyEmailToResetPassword } = require('./templateVerifyEmailToResetPassword.js')

async function verifyAccountEmail(user, token) {
  // let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_SERVER_USER,
      pass: process.env.SMTP_SERVER_PASS,
    },
  });

  /*   const token = jwt.sign({ email: user.email}, process.env.TOKEN_SECRET); */
  /*   const urlConfirm = `${process.env.APIGATEWAY_URL}/auth/local/validate-email/${token}` */

  const urlConfirm = `https://clens.netlify.app/validation-email/${token}`
  // send mail with defined transport object
  await transporter.sendMail({
    from: '"Clens - El mejor servicio al mejor precio 👻" <no-reply@clens.com>', // sender address
    to: user.email, // list of receivers
    subject: 'Correo de Verificacion ✔', // Subject line
    text: 'Texto de confirmacion en formato texto', // plain text body
    html: templateVerifyEmail(user, urlConfirm), // html body
  });

  // console.log("Message sent: %s", info.messageId);
  // console.log("token:", token);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>;
}

async function verifyEmailToResetPassword(user, token) {
  // let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_SERVER_USER,
      pass: process.env.SMTP_SERVER_PASS,
    },
  });

  /*   const token = jwt.sign({ email: user.email}, process.env.TOKEN_SECRET); */
  /*   const urlConfirm = `${process.env.APIGATEWAY_URL}/auth/local/validate-email/${token}` */

  const urlConfirm = `https://clens.netlify.app/reset-password/${token}`
  // send mail with defined transport object
  await transporter.sendMail({
    from: '"Clens - El mejor servicio al mejor precio 👻" <no-reply@clens.com>', // sender address
    to: user.email, // list of receivers
    subject: 'Correo de Cambio de contraseña ✔', // Subject line
    text: 'Texto de confirmacion en formato texto', // plain text body
    html: templateVerifyEmailToResetPassword(user, urlConfirm), // html body
  });

  // console.log("Message sent: %s", info.messageId);
  // console.log("token:", token);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>;
}

module.exports = {
  verifyAccountEmail,
  verifyEmailToResetPassword
};
