exports.index = async (req, res) => {
  try {
    res.json({'message':"Hello World!"})
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};