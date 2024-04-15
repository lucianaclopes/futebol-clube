import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeMatch from '../database/models/SequelizeMatch';
import { allMatches, matchesDone, matchesInProgress } from './mocks/match.mock';


chai.use(chaiHttp);

const { expect } = chai;

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
  afterEach(sinon.restore);
});
