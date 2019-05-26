require('dotenv').config();
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const openApiDocumentation = require('../api-doc');
const contacts = require('./controllers/contacts');
const OpenApiValidator = require('express-openapi-validator').OpenApiValidator;

const app = express();
app.use(express.json());

new OpenApiValidator({
  apiSpecPath: path.join(__dirname, '../api-doc.json'),
}).install(app);


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiDocumentation));

app.use('/api/v1/contacts', contacts);

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(err.status).json({
    errors: err.errors,
  });
});

mongoose.connect(process.env.DB_CONNECTION_URI, { useNewUrlParser: true }, function (err) {
  if (err) throw err;

  console.log('Connected to db server');
  app.listen(process.env.PORT, () => console.log(`App listening on port ${process.env.PORT}!`));
});

process.on('SIGINT', function() {
  mongoose.disconnect(function () {
    console.log('Mongo disconnected on app termination');
    process.exit(0);
  });
});