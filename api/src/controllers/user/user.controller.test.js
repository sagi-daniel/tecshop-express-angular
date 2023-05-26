const { mockRequest, mockResponse } = require('jest-mock-req-res');
const createError = require('http-errors');
const userController = require('./user.controller');
const userService = require('./user.service');
jest.mock('./user.service.js');

describe('UserController tests:', () => {
  let mockData;
  let nextFunction;
  let response;

  beforeEach(() => {
    mockData = [
      {
        id: '6421ea7e7b9d35dc96fd31e4',
        role: 'customer',
        userName: 'johndoe',
        password: 'asd1234567',
        passwordConfrim: 'asd1234567',
        firstName: 'John',
        lastName: 'Doe',
        birthYear: 1985,
        email: 'johndoe@example.com',
        phone: '06703256854',
        cart: '',
        orders: []
      },
      {
        id: '6421ea7e7b9d35dc96fd31e5',
        role: 'admin',
        userName: 'janedoe',
        password: 'asd1234567',
        passwordConfrim: 'asd1234567',
        firstName: 'Jane',
        lastName: 'Doe',
        birthYear: 1990,
        email: 'janedoe@example.com',
        phone: '06703256854',
        cart: '',
        orders: []
      },
      {
        id: '6421ea7e7b9d35dc96fd31e6',
        role: 'customer',
        userName: 'bobbybrown',
        password: 'asd1234567',
        passwordConfrim: 'asd1234567',
        firstName: 'Bobby',
        lastName: 'Brown',
        birthYear: 1982,
        email: 'bobbybrown@example.com',
        phone: '06703256854',
        cart: '',
        orders: []
      },
      {
        id: '6421ea7e7b9d35dc96fd31e8',
        role: 'customer',
        userName: 'sarahjones',
        password: 'asd1234567',
        passwordConfrim: 'asd1234567',
        firstName: 'Sarah',
        lastName: 'Jones',
        birthYear: 1992,
        email: 'sarahjones@example.com',
        phone: '06703256854',
        cart: '',
        orders: []
      },
      {
        id: '6421ea7e7b9d35dc96fd31e9',
        role: 'admin',
        userName: 'jacksmith',
        password: 'asd1234567',
        passwordConfrim: 'asd1234567',
        firstName: 'Jack',
        lastName: 'Smith',
        birthYear: 1980,
        email: 'jacksmith@example.com',
        phone: '06703256854',
        cart: '',
        orders: []
      }
    ];

    userService.__setMockData(mockData);
    nextFunction = jest.fn();
    response = mockResponse();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('findById() with valid ID', async () => {
    const VALID_USER_ID = '6421ea7e7b9d35dc96fd31e9';
    const request = mockRequest({
      params: {
        id: VALID_USER_ID
      }
    });

    await userController.findById(request, response, nextFunction);
    expect(userService.findById).toBeCalledWith(VALID_USER_ID);
    expect(userService.findById).toBeCalledTimes(1);
    expect(response.json).toBeCalledWith(
      mockData.find((p) => p.id === VALID_USER_ID)
    );
  });

  test('findById() with invalid ID', async () => {
    const INVALID_USER_ID = '6421ea7e7b9d35dc96fd31e9a';
    const request = mockRequest({
      params: {
        id: INVALID_USER_ID
      }
    });

    await userController.findById(request, response, nextFunction);
    expect(userService.findById).toBeCalledWith(INVALID_USER_ID);
    expect(response.json).not.toBeCalled();
    expect(userService.findById).toBeCalledTimes(1);
    expect(nextFunction).toBeCalledWith(
      new createError.NotFound('User was not found!')
    );
  });

  test('create() with valid User', async () => {
    const VALID_USER = {
      id: '6425bd8dc85edac93831693c',
      role: 'customer',
      userName: 'johndoe',
      password: 'asd1234567',
      passwordConfrim: 'asd1234567',
      firstName: 'John',
      lastName: 'Doe',
      birthYear: 1985,
      email: 'johndoe@example.com',
      phone: '06703156985',
      cart: '',
      orders: []
    };
    const request = mockRequest({
      body: VALID_USER
    });

    await userController.create(request, response, nextFunction);
    expect(userService.create).toBeCalledWith(VALID_USER);
    expect(userService.create).toBeCalledTimes(1);
    expect(response.json).toHaveBeenCalledWith(VALID_USER);
  });

  //TODO UPDATE TEST
  // test('update() with valid User id', async () => {
  //   const VALID_USER_ID = '6421ea7e7b9d35dc96fd31e4';
  //   const VALID_USER = {
  //     role: 'ADMIN',
  //     userName: 'TEST',
  //     password: 'asd1234567',
  //     passwordConfrim: 'asd1234567',
  //     firstName: 'John',
  //     lastName: 'Doe',
  //     birthYear: '1985',
  //     email: 'johndoe@example.com',
  //     phone: '06703156985',
  //     cart: '',
  //     orders: []
  //   };
  //   const request = mockRequest({
  //     params: {
  //       id: VALID_USER_ID,
  //       body: VALID_USER
  //     }
  //   });

  //   await userController.update(request, response, nextFunction);
  //   expect(userService.update).toBeCalledWith(VALID_USER_ID, VALID_USER);
  //   expect(userService.update).toBeCalledTimes(1);
  // });

  test('delete() with valid User id', async () => {
    const VALID_USER_ID = '6421ea7e7b9d35dc96fd31e4';

    const request = mockRequest({
      params: {
        id: VALID_USER_ID
      }
    });

    await userController.delete(request, response, nextFunction);
    expect(userService.delete).toBeCalledWith(VALID_USER_ID);
    expect(userService.delete).toBeCalledTimes(1);
    expect(response.json).toHaveBeenCalledWith('Removed');
  });
});
