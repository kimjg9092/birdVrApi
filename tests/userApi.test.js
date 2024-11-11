const request = require('supertest');
const { app, startServer, stopServer } = require('../src/index');
const { clearDatabase, closeDatabase } = require('./testHelper');

let server;

beforeAll(async () => {
  server = await startServer();
});

afterAll(async () => {
  await stopServer();
  await closeDatabase();
});

beforeEach(async () => {
  await clearDatabase();
});

// 여기에 테스트 코드를 작성합니다...

describe('User API', () => {
  it('should create a new user', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({
        name: 'John Doe',
        email: 'john@example.com',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toEqual('John Doe');
    expect(res.body.email).toEqual('john@example.com');
  });

  it('should get all users', async () => {
    await request(app)
      .post('/api/users')
      .send({
        name: 'John Doe',
        email: 'john@example.com',
      });

    const res = await request(app).get('/api/users');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toEqual(1);
    expect(res.body[0].name).toEqual('John Doe');
  });

  it('should get a user by id', async () => {
    const user = await request(app)
      .post('/api/users')
      .send({
        name: 'John Doe',
        email: 'john@example.com',
      });

    const res = await request(app).get(`/api/users/${user.body.id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toEqual('John Doe');
    expect(res.body.email).toEqual('john@example.com');
  });

  it('should update a user', async () => {
    const user = await request(app)
      .post('/api/users')
      .send({
        name: 'John Doe',
        email: 'john@example.com',
      });

    const res = await request(app)
      .put(`/api/users/${user.body.id}`)
      .send({
        name: 'Jane Doe',
        email: 'jane@example.com',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toEqual('Jane Doe');
    expect(res.body.email).toEqual('jane@example.com');
  });

  it('should delete a user', async () => {
    const user = await request(app)
      .post('/api/users')
      .send({
        name: 'John Doe',
        email: 'john@example.com',
      });

    const res = await request(app).delete(`/api/users/${user.body.id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('User deleted successfully');

    const getRes = await request(app).get(`/api/users/${user.body.id}`);
    expect(getRes.statusCode).toEqual(404);
  });
});

afterEach(() => {
  jest.resetAllMocks();
});