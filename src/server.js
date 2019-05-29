require('dotenv').config();
const mongoose = require('mongoose');

const app = require('./app');

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

module.exports = app;