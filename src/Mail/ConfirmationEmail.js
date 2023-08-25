const nodemailer = require('nodemailer');
const logger = require('../../config/logger');

const ConfirmationEmail = async (email, confirmationCode) => {
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
      subject: 'Confirmation Email',
      html: `<p><h1>Registration Succeess!</h1><p><p>Activate your account by clicking this link <a href="${process.env.LINK+'/api/auth/confirmation-email/'+confirmationCode}">Activate my account</a></p>`,
    });
    logger.info('Confirmation email sent successfully to '+email)
  } catch (error) {
    logger.error(error);
  }
};

module.exports = ConfirmationEmail;