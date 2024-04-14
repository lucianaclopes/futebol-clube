import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeUser from '../database/models/SequelizeUser';
import JWT from '../utils/jwtUtil';
import ValidationsMiddleware from '../middlewares/validationsMiddleware';

import { validAdmin, invalidAdmin, invalidUser, adminWithoutEmail,adminWithoutPassword, 
  userNotFound,incorrectPassword, adminRegistered, validLoginBody, userWithWrongPassword} from './mocks/login.mock';


chai.use(chaiHttp);

const { expect } = chai;

describe('Login Test', function() {
  it('Should not login with an invalid body data', async function() {
    const {status, body} = await chai.request(app).post('/login').send({});
    expect(status).to.be.equal(400);
    expect(body).to.be.deep.equal({message: 'All fields must be filled'});
});

  it('Should not login without an email', async function() {
    const {status, body} = await chai.request(app).post('/login').send(adminWithoutEmail);
    expect(status).to.be.equal(400);
    expect(body).to.be.deep.equal({message: 'All fields must be filled'});
  });

  it('Should not login without a password', async function() {
    const {status, body} = await chai.request(app).post('/login').send(adminWithoutPassword);
    expect(status).to.be.equal(400);
    expect(body).to.be.deep.equal({message: 'All fields must be filled'});
  });

  it('Should not login with an invalid email', async function() {
    const {status, body} = await chai.request(app).post('/login').send(invalidAdmin);
    expect(status).to.be.equal(401);
    expect(body).to.be.deep.equal({message: 'Invalid email or password'});
  });

  it('Should not login with an invalid password', async function() {
    const {status, body} = await chai.request(app).post('/login').send(invalidUser);
    expect(status).to.be.equal(401);
    expect(body).to.be.deep.equal({message: 'Invalid email or password'});
  });

  it('Should not login with an user that does not exist', async function() {
    const {status, body} = await chai.request(app).post('/login').send(userNotFound);
    expect(status).to.be.equal(401);
    expect(body).to.be.deep.equal({message: 'Invalid email or password'});
  });

  it('Should not login with an incorrect password', async function() {
    const {status, body} = await chai.request(app).post('/login').send(incorrectPassword);
    expect(status).to.be.equal(401);
    expect(body).to.be.deep.equal({message: 'Invalid email or password'});
  });

  it('Should return a token when is login done', async function() {
    sinon.stub(SequelizeUser, 'findOne').resolves(adminRegistered as any);
    sinon.stub(JWT, 'sign').returns('validToken');
    sinon.stub(ValidationsMiddleware, 'validateLogin').returns();

    const {status, body} = await chai.request(app)
    .post('/login')
    .send(validLoginBody);

    expect(status).to.be.equal(200);
    expect(body).to.have.key('token');
  });

  it('Should return invalid data when user password is wrong', async function() {
    sinon.stub(SequelizeUser, 'findOne').resolves(userWithWrongPassword as any);
    sinon.stub(JWT, 'sign').returns('validToken');
    sinon.stub(ValidationsMiddleware, 'validateLogin').returns();

    const {status, body} = await chai.request(app)
    .post('/login')
    .send(validLoginBody);

    expect(status).to.be.equal(401);
    expect(body).to.be.deep.equal({message: 'Invalid email or password'});
});
  afterEach(sinon.restore);
 });

 describe('Login Role Test', function() {
  it('Should not return user role without a token', async function() {
    const {status, body} = await chai.request(app).get('/login/role');
    expect(status).to.be.equal(401);
    expect(body).to.be.deep.equal({message: 'Token not found'});
  });

  it('Should not return user role with an invalid token', async function() {
    const {status, body} = await chai.request(app)
    .get('/login/role')
    .set('Authorization', 'Bearer invalidToken');

    expect(status).to.be.equal(401);
    expect(body).to.be.deep.equal({message: 'Token must be a valid token'});
 });

 it('Should return user role with a valid token', async function() {
  sinon.stub(SequelizeUser, 'findOne').resolves(validAdmin as any);
  sinon.stub(JWT, 'verify').returns({role: 'admin'});
  const {status, body} = await chai
  .request(app)
  .get('/login/role')
  .set('Authorization', 'Bearer validToken');

  expect(status).to.be.equal(200);
  expect(body).to.have.key('role');
});
afterEach(sinon.restore);
 });