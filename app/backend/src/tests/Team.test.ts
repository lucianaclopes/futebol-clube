import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeTeam from '../database/models/SequelizeTeam';

import { team, teams } from './mocks/Team.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Team', () => {
  it('Should return all teams', async function() {
    sinon.stub(SequelizeTeam, 'findAll').resolves(teams as any);
    const {status, body} = await chai.request(app).get('/teams');
    expect(status).to.be.eq(200);
    expect(body).to.be.deep.eq(teams);
  });

  it('Should return a team by id', async function () {
    sinon.stub(SequelizeTeam, 'findOne').resolves(team as any);
    const {status, body} = await chai.request(app).get(`/teams/1`);
    expect(status).to.be.eq(200);
    expect(body).to.be.deep.eq(team);
  });

  it('Should return 404 when team is not found', async function () {
    sinon.stub(SequelizeTeam, 'findOne').resolves(null);
    const {status, body} = await chai.request(app).get('/teams/1');
    expect(status).to.be.eq(404);
    expect(body.message).to.be.eq('Team 1 not found');
  });
  afterEach(sinon.restore);
});