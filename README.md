![CI](https://github.com/jmartinezhern/pointing-poker-web-app/workflows/CI/badge.svg)

# Pointing Poker Web Application

This project is the correspondent front-end application for the [Pointing Poker App](https://github.com/jmartinezhern/pointing_poker)

## Building

GraphQL codegen and Parcel both use `.env` files to inject environment variable values on the app.

Setup an `.env` for the NODE_ENV that you are targeting. For example for `NODE_ENV=production`, define a file called `.env.production` with the following variables.

> The values for these variables should be dervied from the back-end depoyment. See [deployment details](https://github.com/jmartinezhern/pointing_poker#cdk-deploy).

```shell script
GRAPHQL_API_KEY=<your_api_key>
GRAPHQL_API_HOST=<host_url_of_your_api>
GRAPHQL_WS_HOST=<websockets_host_url_for_your_api>
```

Then run:

```shell script
NODE_ENV=production npm run build
```
