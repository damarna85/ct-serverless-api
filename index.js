const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const express = require('express');
const jwt = require('jsonwebtoken');
const myOrdersController = require('./controllers/my-account/my-orders.controller');
const loginController = require('./controllers/login/login.controller');
const app = express();

// Help function to generate an IAM policy
const generatePolicy = (principalId, effect, resource) => {
  var authResponse = {};

  authResponse.principalId = principalId;
  if (effect && resource) {
    var policyDocument = {};
    policyDocument.Version = '2012-10-17';
    policyDocument.Statement = [];
    var statementOne = {};
    statementOne.Action = 'execute-api:Invoke';
    statementOne.Effect = effect;
    statementOne.Resource = resource;
    policyDocument.Statement[0] = statementOne;
    authResponse.policyDocument = policyDocument;
  }

  // Optional output with custom properties of the String, Number or Boolean type.
  authResponse.context = {
    stringKey: 'stringval',
    numberKey: 123,
    booleanKey: true,
  };
  return authResponse;
};

app.use(bodyParser.json({ strict: false }));

app.get('/my-account/orders', myOrdersController);
app.post('/login', loginController);

const authorize = (event, context, callback) => {
  const token = event.authorizationToken;

  try {
    // Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;
    const authResponse = generatePolicy(userId, 'Allow', event.methodArn);
    callback(null, authResponse);
  } catch (e) {
    callback('Unauthorized'); // Return a 401 Unauthorized response
  }
};

module.exports = {
  handler: serverless(app),
  authorize,
};
