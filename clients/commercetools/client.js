const SphereClient = require('sphere-node-sdk').SphereClient;

const client = new SphereClient({
  config: {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    project_key: process.env.PROJECT_KEY,
  },
  host: 'api.commercetools.com',
  oauth_host: 'auth.commercetools.com',
});

module.exports = { client };
