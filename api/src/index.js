const config = require('../../config/default.json');
const logger = require('./config/logger');
const mongoose = require('mongoose');
const app = require('./server');

mongoose
  .connect(
    `mongodb+srv://${config.database.user}:${config.database.password}@${config.database.host}`
  )
  .then(() => {
    logger.info('Mongodb connection is successful!');
  })
  .catch((err) => {
    console.error(err);
    process.exit();
  });

app.listen(config.port, () => {
  console.log(`Server running on ${config.port}`);
});
