import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeMatch from '../database/models/SequelizeMatch';
import { allMatches, matchesDone, matchesInProgress, match3, newMatch, newBodyMatch, matchwithSameTeams, matchWithGhostTeam } from './mocks/match.mock';
import { Request, Response, NextFunction } from 'express';
import ValidationsMiddleware from '../middlewares/validationsMiddleware';
import { validLoginBody, validTokenWithBearer } from './mocks/login.mock';
import { team } from './mocks/Team.mock';
import SequelizeTeam from '../database/models/SequelizeTeam';
import JWT from '../utils/jwtUtil';


chai.use(chaiHttp);

const { expect } = chai;

process.env.JWT_SECRET = 'jwt_secret'

describe('Match Test', function() {
  it('Should return all matches', async function() {
    sinon.stub(SequelizeMatch, 'findAll').returns(allMatches as any);
    const { status, body } = await chai.request(app).get('/matches');
    expect(status).to.equal(200);
    expect(body).to.deep.equal(allMatches);
  });

  it('Should return all matches in progress', async function() {
    sinon.stub(SequelizeMatch, 'findAll').callsFake(async (options: any) => {
      if (options.where && options.where.inProgress === true) {
        return matchesInProgress as any;
      } else {
        return allMatches as any;
      }
    });

    const { status, body } = await chai.request(app).get('/matches?inProgress=true');
    expect(status).to.equal(200);
    expect(body).to.deep.equal(matchesInProgress);
  });

  it('Should return all matches done', async function() {
    sinon.stub(SequelizeMatch, 'findAll').callsFake(async (options: any) => {
      if (options.where && options.where.inProgress === false) {
        return matchesDone as any;
      } else {
        return allMatches as any;
      }
    });

    const { status, body } = await chai.request(app).get('/matches?inProgress=false');
    expect(status).to.equal(200);
    expect(body).to.deep.equal(matchesDone);
  });

  it('Should not possible to finish a match whitout a token', async function() {
    const { status, body } = await chai.request(app).patch('/matches/3/finish');
    expect(status).to.equal(401);
    expect(body).to.deep.equal({ message: 'Token not found' });
  });

  it('Should not possible to finish a match with an invalid token', async function() {
    const { status, body } = await chai.request(app)
    .patch('/matches/3/finish')
    .set('Authorization', 'Bearer invalidToken');
    expect(status).to.equal(401);
    expect(body).to.deep.equal({ message: 'Token must be a valid token' });
  });

  it('Should finish the match and returns status 200 and a message Finished', async function(){
    it('Should finish the match and returns status 200 and a message Finished', async function(){
      const loginResponse = await chai.request(app)
        .post('/login')
        .send(validLoginBody);
    
      const validToken = loginResponse.body.token;
    
      const { status, body } = await chai.request(app)
        .patch('/matches/3/finish')
        .send({ decodedToken: validToken });
    
      expect(status).to.equal(200);
      expect(body).to.deep.equal({ message: 'Finished' });
    });
  });

  it('Should not possible to update a match without a token', async function() {
    const { status, body } = await chai.request(app)
    .patch('/matches/3')
    .send({ homeTeamGoals: 4, awayTeamGoals: 3 });
    
    expect(status).to.equal(401);
    expect(body).to.deep.equal({ message: 'Token not found' });
  });

  it('Should not possible to update a match with an invalid token', async function() {
    const { status, body } = await chai.request(app)
    .patch('/matches/3')
    .set('Authorization', 'Bearer invalidToken')
    .send({ homeTeamGoals: 4, awayTeamGoals: 3 });
    
    expect(status).to.equal(401);
    expect(body).to.deep.equal({ message: 'Token must be a valid token' });
  });

  it('Should possible to update a match and returns status 200 and a message Updated', async function(){
  sinon.stub(SequelizeMatch, 'update').returns([1] as any);
  sinon.stub(SequelizeMatch, 'findByPk').resolves(newMatch as any);
  sinon.stub(SequelizeTeam, 'findByPk').resolves(team as any);
  sinon.stub(JWT, 'verify').resolves();

  const {id, ...match} = newMatch;

  const {status, body} = await chai.request(app)
  .patch('/matches/4')
  .set('Authorization', validTokenWithBearer)
  .send(match)

  expect(status).to.equal(200);
  expect(body).to.deep.equal({ message: 'Updated' });
  });

  it('Should create a match and returns status 201 and the new match', async function(){
  sinon.stub(SequelizeMatch, 'create').resolves(newMatch as any);
  sinon.stub(SequelizeTeam, 'findByPk').resolves(team as any);
  sinon.stub(JWT, 'verify').resolves();
  sinon.stub(ValidationsMiddleware, 'validateMatch').resolves();

  const { status, body } = await chai.request(app)
  .post('/matches')
  .set('Authorization', validTokenWithBearer)
  .send(newMatch);

  expect(status).to.equal(201);
  expect(body).to.deep.equal(newMatch);

  });

  it ('Should not create a match with the same teams', async function(){
    sinon.stub(SequelizeTeam, 'findByPk').resolves(team as any);
    sinon.stub(JWT, 'verify').resolves();
    sinon.stub(ValidationsMiddleware, 'validateMatch').resolves();

    const { status, body } = await chai.request(app)
    .post('/matches')
    .set('Authorization', validTokenWithBearer)
    .send(matchwithSameTeams);

    expect(status).to.equal(422);
    expect(body).to.deep.equal({ message: 'It is not possible to create a match with two equal teams' });
  });

  // it('Should not possible to create a match with an inexistent team', async function(){
  //   sinon.stub(SequelizeTeam, 'findByPk').resolves(null);
  //   sinon.stub(JWT, 'verify').resolves();
  //   sinon.stub(ValidationsMiddleware, 'validateMatch').resolves();

  //   const { status, body } = await chai.request(app)
  //   .post('/matches')
  //   .set('Authorization', validTokenWithBearer)
  //   .send(matchWithGhostTeam);

  //   expect(status).to.equal(422);
  //   expect(body).to.deep.equal({ message: 'There is no team with such id!' });
  // });

  afterEach(sinon.restore);
});
