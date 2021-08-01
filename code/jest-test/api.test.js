const express = require('express'); // import express
const serverRoutes = require('./router'); //import file we are testing
const request = require('supertest'); // supertest is a framework that allows to easily test web apis
const app = express(); //an instance of an express app, a 'fake' express app

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', serverRoutes); //routes

describe('testing-server-routes', () => {
  it('GET /users - success', async () => {
    const { body } = await request(app).get('/users'); //uses the request function that calls on express app instance
    expect(body).toEqual({
      raspinall: {
        username: 'raspinall',
        firstname: 'Richard',
        lastname: 'Aspinall',
      },
      jsmith: {
        username: 'jsmith',
        firstname: 'James',
        lastname: 'Smith',
      },
    });
  });
  it('GET /user/raspinall - success', async () => {
    const { body } = await request(app).get('/user/raspinall'); //uses the request function that calls on express app instance
    expect(body).toEqual({
      username: 'raspinall',
      firstname: 'Richard',
      lastname: 'Aspinall',
    });
  });
  it('GET /user/raspinalls - error', async () => {
    const { body } = await request(app).get('/user/raspinalls'); //uses the request function that calls on express app instance
    expect(body).toEqual({
      error: 'User not found',
    });
  });
  it('POST /user/create - success', async () => {
    const { body } = await request(app)
      .post('/user/create')
      .send({
        username: 'jdoe',
        firstname: 'jane',
        lastname: 'doe',
      })
      .set('Accept', 'application/json');
    expect(body).toEqual({
      username: 'jdoe',
      firstname: 'jane',
      lastname: 'doe',
    });
  });
});
