const path = require('path');
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const openApiDocumentation = require('../api-doc');
const contacts = require('./controllers/contacts');
const contactGroups = require('./controllers/contactgroups');
const OpenApiValidator = require('express-openapi-validator').OpenApiValidator;

const app = express();
app.use(express.json());

new OpenApiValidator({
  apiSpecPath: path.join(__dirname, '../api-doc.json'),
}).install(app);


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiDocumentation));

app.use('/api/v1/contacts', contacts);

app.use('/api/v1/contact_groups', contactGroups);

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(err.status).json({
    errors: err.errors,
  });
});

module.exports = app;