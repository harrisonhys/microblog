
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const Users = require('../models/admin/users');
const ConfirmationEmail = require('../Mail/ConfirmationEmail')
const ForgotPassword = require('../Mail/ForgotPassword')

exports.login = async (req, res) => {
    const { username, password } = req.body;
    const active = 1
    try {
      const user = await Users.findOne({ where: { username, active } });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      const isPasswordValid = await user.checkPassword(password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid password' });
      }
      const expiresIn = 60 * process.env.ACCESS_TOKEN_EXPIRE_MINUTES
      const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
        expiresIn,
      });
      res.json({ token, expiresIn });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Login failed' });
    }
};

exports.change_password = async (req, res) => {
const { oldPassword, newPassword, confirmPassword } = req.body;
try {
    const user = await Users.findByPk(req.user.id);
    const isOldPasswordValid = await user.checkPassword(oldPassword);
    if (!isOldPasswordValid) {
    return res.status(400).json({ message: 'Invalid old password' });
    }
    if (newPassword !== confirmPassword) {
    return res.status(400).json({ message: "New password and confirmation don't match" });
    }
    user.password = newPassword;
    user.last_change_password = new Date()
    await user.save();
    res.json({ message: 'Password updated successfully' });
} catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Password change failed' });
}
};
  
exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const confirmationCode = uuidv4();
        await Users.create({ username, email, password, uuid :  confirmationCode});
        await ConfirmationEmail(email, confirmationCode);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
        res.status(400).json({ message: 'Username or email already exists' });
        } else {
        console.error(error);
        res.status(500).json({ message: 'Registration failed' });
        }
    }
}

exports.forgot_password = async (req, res) => {
    const { email } = req.body;
    try {
        const user  = await Users.findOne({ where: { email } });
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        const token = uuidv4();
        user.resetToken = token;
        await user.save();
        await ForgotPassword(email,token)
        res.status(201).json({ message: 'Reset password link has been sent to '+email });
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
        res.status(400).json({ message: 'Username or email not valid' });
        } else {
        console.error(error);
        res.status(500).json({ message: 'Sending email failed' });
        }
    }
}

exports.confirmation_email = async (req, res) => {
    try {
        const User  = await Users.update(
            { email_verified_at : new Date()},
            { where: { uuid: req.params.uuid } }
        );
        res.json({'message':'Successfuly confirm youe account!'});
    } catch (error) {
        res.json({'message':'Theres something wrong', 'error' : error});
    }
}

exports.reset_password = async (req, res) => {
    const { email, resetToken, newPassword, confirmPassword } = req.body;
    try {
        const user = await Users.findOne({ where: { email, resetToken } });
    if (!user) {
        return res.status(404).json({ message: 'Invalid reset token' });
    }
    if (newPassword !== confirmPassword) {
        return res.status(400).json({ message: "New password and confirmation don't match" });
    }
    user.password = newPassword;
    user.resetToken = null; 
    await user.save();
        res.json({ message: 'Successfully reset your password!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Password reset failed' });
    }
}