# commercetools serverless API

Just a basic example of some endpoints in serverless integrating the commercetools platform.


### Prerequisites

First of all you will need an AWS account to make this project work. Once created, you will have to configure your account locally and install serverless.
The installation guide can be found [here](https://serverless.com/framework/docs/providers/aws/guide/installation/)
To configure your AWS account locally, you can find some tips [here](https://serverless.com/framework/docs/providers/aws/guide/credentials/)

### Setting your env variables and deploying

Once your AWS account is created and serverless is properly set up locally, to run the example copy the `env.example.yml` to a local `env.yml` and set there your config keys. In this case you will need the keys from commercetools and configure JWT data for your access token.

```
# commercetools credentials
CLIENT_SECRET: <your client secret here>
CLIENT_ID: <your client id here>
PROJECT_KEY: <your project key here>

# jwt config
JWT_SECRET: <secret for your jwt config>
JWT_EXPIRATION_TIME: <expiration time for token>
```

Once your `env.yml` is created, you can now deploy by executing:
```
sls deploy
```

Remember that you can deploy just the functions you need instead by executing:

```
serverless deploy function --function myFunction
```

## Built With

* [serverless](https://serverless.com/framework/docs/providers/aws/guide/intro/) - serverless
* [Sphere NodeJS SDK](https://github.com/sphereio/sphere-node-sdk) - commercetools SDK client
* [JWT](https://jwt.io/) - access tokens



## Authors

* **Daniel Martínez** - *POC* -


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

