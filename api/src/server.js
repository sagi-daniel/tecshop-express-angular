require('dotenv').config();
const express = require('express');
const { join } = require('path');
const logger = require('./config/logger');

const authenticateJWT = require('./auth/authenticate');
const adminAuth = require('./auth/adminOnly');
const authHandler = require('./auth/authHandler');

const angularAppPath = join(__dirname, '..', 'public', 'angular');

const app = express();

const apiWrapper = express();
apiWrapper.use('/api', app);

app.use(express.json());

app.post('/login', authHandler.login);
app.post('/refresh', authHandler.refresh);
app.post('/logout', authHandler.logout);
app.post('/me', authHandler.me);

app.use(
  '/user',
  authenticateJWT,
  adminAuth,
  require('./controllers/user/user.routes')
);
app.use('/product', require('./controllers/product/product.routes'));

apiWrapper.use('/', express.static(angularAppPath));

apiWrapper.get('*', (req, res) => {
  res.sendFile(angularAppPath + '/index.html');
});

app.use('/', (err, req, res, next) => {
  logger.info(`ERROR ${err.statusCode},: ${err.message}`);
  res.status(err.statusCode);
  res.json({
    hasError: true,
    message: err.message
  });
});

module.exports = apiWrapper;
