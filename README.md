Generic Resources for Restify
=========

A small library that adds C.R.U.D. operations to Restify WebServers using SequelizeJS ORM.

## Installation

  `npm install restify-generic-resources`

## Usage

```
const genericResources = require('restify-generic-resources');
genericResources.setupAPI(server, '<sequelize-model-name>', <sequelize-models>);
```
    
## Response  
Library should create C.R.U.D endpoints:

```
GET   /<modelName>/:id    //GET_BY_ID
PUT   /<modelName>        //CREATE
POST  /<modelName>        //UPDATE
GET   /<modelName>        //LIST-ALL
POST  /<modelName>        //LIST-ALL WITH FILTER
DEL   /<modelName>/:id    //DELETE
```


## Tests

  `npm test`

## Contributing

In lieu of a formal style guide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code.