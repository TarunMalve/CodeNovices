const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }
  next();
};

const validateGrievance = (req, res, next) => {
  const { title, description, category } = req.body;
  if (!title || !description || !category) {
    return res.status(400).json({ error: 'Title, description, and category are required' });
  }
  next();
};

module.exports = { validateLogin, validateGrievance };
