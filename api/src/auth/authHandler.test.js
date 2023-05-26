const jwt = require('jsonwebtoken');
const { mockRequest, mockResponse } = require('jest-mock-req-res');
const authHandler = require('./authHandler');

jwt.sign = jest.fn(() => 'mySecretTestToken');
jwt.verify = jest.fn((token, key, callback) => {
  if (token === 'mySecretTestToken') {
    return callback(null, {});
  } else {
    return callback('Error', null);
  }
});

describe('Testing Login authentication', () => {
  let response;
  let next;

  beforeEach(() => {
    jest.clearAllMocks();
    response = mockResponse();
    next = jest.fn();
  });

  test('Test login Endpoint return access & refresh token', async () => {
    const request = mockRequest({
      body: {
        email: 'admin@email.com',
        password: 'admin_pw'
      }
    });
    await authHandler.login(request, response, next);
    expect(response.json).toBeCalledTimes(1);
    expect(response.json).toBeCalledWith({
      accessToken: 'mySecretTestToken',
      refreshToken: 'mySecretTestToken'
    });
  });
});
