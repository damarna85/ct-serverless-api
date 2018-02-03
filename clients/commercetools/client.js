const SphereClient = require('sphere-node-sdk').SphereClient;

let commercetoolsClient;

module.exports = {
  client: !commercetoolsClient
    ? new SphereClient({
        config: {
          client_id: process.env.CLIENT_ID,
          client_secret: process.env.CLIENT_SECRET,
          project_key: process.env.PROJECT_KEY,
        },
        host: process.env.API_HOST || 'api.commercetools.com',
        oauth_host: process.env.AUTH_HOST || 'auth.commercetools.com',
      })
    : commercetoolsClient,
};
