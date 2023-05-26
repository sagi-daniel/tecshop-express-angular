const app = require('./server');
const mongoose = require('mongoose');
const supertest = require('supertest');
const User = require('./models/user.model');

const { userDB } = require('../userDB.json');

describe('REST API integration tests:', () => {
  let ACCESS_TOKEN;
  let REFRESH_TOKEN;

  const insertData = [
    {
      _id: '6421ea7e7b9d35dc96fd31e4',
      role: 'CUSTOMER',
      userName: 'johndoe',
      password: 'asd1234567',
      passwordConfrim: 'asd1234567',
      firstName: 'John',
      lastName: 'Doe',
      birthYear: 1985,
      email: 'johndoe@example.com',
      phone: '06703154953',
      cart: '',
      orders: []
    },
    {
      _id: '6421ea7e7b9d35dc96fd31e5',
      role: 'ADMIN',
      userName: 'janedoe',
      password: 'asd1234567',
      passwordConfrim: 'asd1234567',
      firstName: 'Jane',
      lastName: 'Doe',
      birthYear: 1990,
      email: 'janedoe@example.com',
      phone: '06703154953',
      cart: '',
      orders: []
    },
    {
      _id: '6421ea7e7b9d35dc96fd31e6',
      role: 'CUSTOMER',
      userName: 'bobbybrown',
      password: 'asd1234567',
      passwordConfrim: 'asd1234567',
      firstName: 'Bobby',
      lastName: 'Brown',
      birthYear: 1982,
      email: 'bobbybrown@example.com',
      phone: '06703154953',
      cart: '',
      orders: []
    }
  ];

  beforeEach(async () => {
    await mongoose.connect('mongodb://localhost:27017/testDB');
    console.log('MongoDB test connection estabilished!');
  });

  afterEach(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
    console.log('MongoDB test connection closed!');
  });

  test('GET /user endpoint as ADMIN return 403:', async () => {
    await User.insertMany(insertData);

    await supertest(app)
      .post('/login')
      .send({
        email: 'user@email.com',
        password: 'user_pw'
      })
      .then((res) => {
        ACCESS_TOKEN = res.body.accessToken;
        REFRESH_TOKEN = res.body.refreshToken;
      });

    const response = await supertest(app)
      .get('/user')
      .set('Authorization', `Bearer ${ACCESS_TOKEN}`);

    expect(response.statusCode).toBe(403);
  });

  test('GET /user endpoint as USER return list:', async () => {
    await User.insertMany(insertData);

    await supertest(app)
      .post('/login')
      .send({
        email: 'admin@email.com',
        password: 'admin_pw'
      })
      .then((res) => {
        ACCESS_TOKEN = res.body.accessToken;
        REFRESH_TOKEN = res.body.refreshToken;
      });

    const response = await supertest(app)
      .get('/user')
      .set('Authorization', `Bearer ${ACCESS_TOKEN}`);

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toBe(insertData.length);

    response.body.forEach((user, i) => {
      expect(user.role).toBe(insertData[i].role);
      expect(user.userName).toBe(insertData[i].userName);
      expect(user.lastName).toBe(insertData[i].lastName);
      expect(user.birthYear).toBe(insertData[i].birthYear);
      expect(user.email).toBe(insertData[i].email);
      expect(user.phone).toBe(insertData[i].phone);
    });
  });

  test('GET /user/:id endpoint:', async () => {
    const testUsers = await User.insertMany(insertData);
    const firstUserId = testUsers[0]._id.toString();

    await supertest(app)
      .post('/login')
      .send({
        email: 'admin@email.com',
        password: 'admin_pw'
      })
      .then((res) => {
        ACCESS_TOKEN = res.body.accessToken;
        REFRESH_TOKEN = res.body.refreshToken;
      });

    const response = await supertest(app)
      .get(`/user/${firstUserId}`)
      .set('Authorization', `Bearer ${ACCESS_TOKEN}`);

    expect(response.statusCode).toBe(200);
    expect(response.body._id).toBe(firstUserId);
    expect(response.body.role).toBe(insertData[0].role);
    expect(response.body.userName).toBe(insertData[0].userName);
    expect(response.body.lastName).toBe(insertData[0].lastName);
    expect(response.body.birthYear).toBe(insertData[0].birthYear);
    expect(response.body.email).toBe(insertData[0].email);
    expect(response.body.phone).toBe(insertData[0].phone);
  });

  test('GET /user/:id endpoint with invalid ID:', async () => {
    await User.insertMany(insertData);
    const INVALID_USER_ID = '6421ea7e7b9d35dc96fd31ea';

    await supertest(app)
      .post('/login')
      .send({
        email: 'admin@email.com',
        password: 'admin_pw'
      })
      .then((res) => {
        ACCESS_TOKEN = res.body.accessToken;
        REFRESH_TOKEN = res.body.refreshToken;
      });

    const response = await supertest(app)
      .get(`/user/${INVALID_USER_ID}`)
      .set('Authorization', `Bearer ${ACCESS_TOKEN}`);

    expect(response.statusCode).toBe(404);
    expect(response.body.hasError).toBeTruthy();
    expect(response.body.message).toBe('User was not found!');
  });

  test('POST /user endpoint:', async () => {
    await User.insertMany(insertData);
    const testUser = {
      role: 'CUSTOMER',
      userName: 'testUser',
      password: 'asd1234567',
      passwordConfrim: 'asd1234567',
      firstName: 'test',
      lastName: 'ester',
      birthYear: 1982,
      email: 'est@example.com',
      phone: '0670315698',
      cart: '',
      orders: []
    };

    await supertest(app)
      .post('/login')
      .send({
        email: 'admin@email.com',
        password: 'admin_pw'
      })
      .then((res) => {
        ACCESS_TOKEN = res.body.accessToken;
        REFRESH_TOKEN = res.body.refreshToken;
      });

    const response = await supertest(app)
      .post(`/user`)
      .send(testUser)
      .set('Authorization', `Bearer ${ACCESS_TOKEN}`);

    expect(response.statusCode).toBe(201);
    expect(response.body.role).toBe(testUser.role);
    expect(response.body.userName).toBe(testUser.userName);
    expect(response.body.lastName).toBe(testUser.lastName);
    expect(response.body.birthYear).toBe(testUser.birthYear);
    expect(response.body.email).toBe(testUser.email);
    expect(response.body.phone).toBe(testUser.phone);
    const testUserId = response.body._id;
    const testResult = await supertest(app)
      .get(`/user/${testUserId}`)
      .set('Authorization', `Bearer ${ACCESS_TOKEN}`);
    expect(testResult.body).toEqual(response.body);
  });

  test('POST /user endpoint with invalid user:', async () => {
    await User.insertMany(insertData);
    const testUser = {};

    await supertest(app)
      .post('/login')
      .send({
        email: 'admin@email.com',
        password: 'admin_pw'
      })
      .then((res) => {
        ACCESS_TOKEN = res.body.accessToken;
        REFRESH_TOKEN = res.body.refreshToken;
      });

    await supertest(app)
      .post(`/user`)
      .send(testUser)
      .set('Authorization', `Bearer ${ACCESS_TOKEN}`);

    const response = await supertest(app)
      .get(`/user/`)
      .set('Authorization', `Bearer ${ACCESS_TOKEN}`);
    expect(response.body.length).toEqual(insertData.length);
  });
});
