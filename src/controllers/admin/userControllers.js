const Users = require('../../models/admin/users');

exports.createUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const User  = await Users.create({ username, password });
    res.json(User);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const User = await Users.findAll();
    res.json(User);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    // const hashedPassword = await argon2.hash(password);
    const User  = await Users.update(
      { username, password},
      { where: { id: req.params.id } }
    );
    res.json(await Users.findByPk(req.params.id));
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await Users.destroy({ where: { id: req.params.id } });
    res.json({ message: 'User deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};