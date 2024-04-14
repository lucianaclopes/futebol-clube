import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeMatch from '../database/models/SequelizeMatch';
import { match1, match2, matches } from './mocks/match.mock';


chai.use(chaiHttp);

const { expect } = chai;

describe('Match Test', function() {
  it('Should return all matches', async function() {
    sinon.stub(SequelizeMatch, 'findAll').returns(matches as any);
    const { status, body } = await chai.request(app).get('/matches');
    expect(status).to.equal(200);
    expect(body).to.deep.equal(matches);
  });
});
