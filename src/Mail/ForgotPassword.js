const nodemailer = require('nodemailer');
const logger = require('../../config/logger');

const ForgotPassword = async (email, token) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.GMAIL,
        pass: process.env.GMAIL_PASS, 
      },
    });
    await transporter.sendMail({
      from: process.env.GMAIL,
      to: email,
      subject: 'Password Reset',
      html: `<p><h1>Registration Succeess!</h1><p><p> Here is reset password token <b>${token}</b> </p>`,
    });
    logger.info('Reset password token has been sent to '+email)
  } catch (error) {
    logger.error(error);
  }
};

module.exports = ForgotPassword;