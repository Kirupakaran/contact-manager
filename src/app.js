require('dotenv').config();
const express = require('express');
const app = express();

const swaggerUi = require('swagger-ui-express');
const openApiDocumentation = require('../api-doc');

var mongoClient = require('mongodb').MongoClient;

mongoClient.connect(process.env.DB_CONNECTION_URI, { useNewUrlParser: true }, function (err, client) {
  if (err) throw err;

  console.log('Connected to db server');
  app.listen(process.env.PORT, () => console.log(`App listening on port ${process.env.PORT}!`));
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiDocumentation));