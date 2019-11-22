# Restify X-Request-Id
![alt Build](https://travis-ci.org/leandrocurioso/restify-x-request-id.svg?branch=master)

A middleware for restify to add request id in response object.

The default behaviour is very simple, the middleware checks if there's an UUID in X-Request-Id in request header, if so just set the same header to response object.

If there's no X-Request-Id in request object then a new UUID is generated and added to the response object, so this way every micro service that is called will keep passing the same ID to keep tracking of the request from the beginning to the end.

## Install

```console
npm install --save restify-x-request-id
```

## Usage ES6/Typescript

```javascript
import RestfiyXRequestId from "restify-x-request-id";
...
server.use(RestfiyXRequestId.middleware);
...
```

## Usage ES5

```javascript
var restfiyXRequestId = require("restify-x-request-id").default;
...
server.use(restfiyXRequestId.middleware);
...
```

## Obtaining the generated request id

Since the X-Request-Id is linked to the request object (req.reqId), to access you must write:

```javascript
server.use((req, res, next) => {
    console.log(req.reqId);
    //The output will be something like: f2bf0a3b-5d34-43ad-879b-6eceaa0b089e
    return next();
);
```