const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const logger = require('../config/logger');
const { remove } = require('winston');

const refreshDB = [];

exports.login = async (req, res, next) => {
  if (!req.body['email'] || !req.body['password']) {
    return res.status(400).send('Missing username or password');
  }

  const user = await User.findOne({ email: req.body['email'] }, {});

  if (!user || user.passwordConfirm !== req.body['password']) {
    return res.status(400).send('Invalid email or password');
  }

  logger.info(user);
  const accessToken = jwt.sign(
    {
      email: user.email,
      role: user.role,
      user_id: user._id
    },
    process.env.ACCESS_TOKEN_SECRET_KEY,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
  );

  const refreshToken = jwt.sign(
    {
      email: user.email,
      role: user.role,
      user_id: user._id
    },
    process.env.ACCESS_REFRESH_TOKEN_SECRET_KEY
  );

  refreshDB.push(refreshToken);

  res.json({
    accessToken,
    refreshToken,
    user: {
      user_id: user._id,
      role: user.role,
      email: user.email,
      userName: user.userName,
      firstName: user.firstName,
      lastName: user.lastName,
      birthYear: user.birthYear,
      phone: user.phone,
      cart: user.cart,
      orders: user.orders
    }
  });
};

exports.registration = async (req, res, next) => {
  if (!req.body['email'] || !req.body['password']) {
    return res.status(400).send('Missing username or password');
  }

  // if (req.body['password'] !== req.body['passwordConfirm']) {
  //   return res.status(400).send('password and passwordconfirm did not match');
  // }

  const user = await User.findOne({ email: req.body['email'] }, {});
  if (user) {
    return res.status(400).send('Existing email, choose a uniqe one');
  }

  const registratedUser = await User.create(req.body);
  if (registratedUser) {
    logger.info(`New user saved`);
    res.status(201).json(registratedUser);
  }
};

exports.refresh = (req, res, next) => {
  const refreshToken = req.body['refreshToken'];

  if (!refreshToken) {
    return res.sendStatus(400);
  }

  const tokenExist = refreshDB.includes(refreshToken);

  if (tokenExist) {
    jwt.verify(
      refreshToken,
      process.env.ACCESS_REFRESH_TOKEN_SECRET_KEY,
      (err, payLoad) => {
        if (err) {
          return res.sendStatus(403);
        }

        const accessToken = jwt.sign(
          {
            email: payLoad.email,
            user_id: payLoad.user_id,
            role: payLoad.role
          },
          process.env.ACCESS_TOKEN_SECRET_KEY,
          {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
          }
        );
        res.json({ accessToken });
      }
    );
  }
};

exports.logout = (req, res, next) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.sendStatus(400);
  }

  const tokenExist = refreshDB.findIndex((t) => t === refreshToken);

  if (tokenExist >= 0) {
    refreshDB.splice(tokenExist, 1);
    res.status(200).json({});
  } else {
    res.sendStatus(403);
  }
};

exports.me = async (req, res, next) => {
  const authorization = req.headers.authorization;
  const token = authorization.split(' ')[1];

  const loginUser = await User.findOne({ email: req.body['email'] }, {});

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (err, user) => {
    if (!err) {
      res.json({ user: loginUser });
    }
  });
};
