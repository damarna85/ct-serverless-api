const jwt = require('jsonwebtoken');
const { client } = require('../../clients/commercetools/client');

module.exports = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).send('Valid username and password are required.');
    return;
  }
  const customer = {
    email,
    password,
    anonymousCartSignInMode: 'UseAsNewActiveCustomerCart',
  };
  client.customers
    ._save('/login', customer)
    .then(result => {
      const token = jwt.sign(
        { userId: result.body.customer.id },
        process.env.JWT_SECRET,
        {
          expiresIn: process.env.JWT_EXPIRATION_TIME,
        }
      );
      res.json({ token });
    })
    .catch(err => {
      res.status(400).send('Invalid credentials');
    });
};
