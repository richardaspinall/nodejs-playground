const express = require('express'); // import express
const serverRoutes = require('./controllers/users'); //import file we are testing
const request = require('supertest'); // supertest is a framework that allows to easily test web apis
const app = express(); //an instance of an express app, a 'fake' express app
app.use('/users', serverRoutes); //routes

describe('testing-server-routes', () => {
  it('GET /users - success', async () => {
    const { body } = await request(app).get('/users'); //uses the request function that calls on express app instance
    expect(body).toEqual([
      {
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
      },
    ]);
  });
});
