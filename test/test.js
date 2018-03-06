var assert = require('assert');
//require('chai').should();

//import React from 'react';
import { expect, should } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';

const mocks = require('./mocks.js');


import Card from '../src/components/Card/Card';
import List from '../src/components/List/List';
import Board from '../src/components/Board/Board';

//const Card = require('../src/components/Card/Card');
//const round = require('../src/util');
//import { round } from '../src/util';


describe('Array', function () {
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
      // assert.equal([1,2,3].indexOf(4), -1);
      [1, 2, 3].indexOf(4).should.equal(-1);
    });
  });
});

describe('round', function () {
  it('should round to 2 decimals', function () {
    round(33.333,2).should.equal(33.33);
  });
});


describe('<Board />', () => {
  it('renders three <List /> components', () => {
    // Shallow renders the current node and returns a shallow wrapper around it.
    const wrapper = shallow(<Board />);
    expect(wrapper.find(List)).to.have.length(3);
  });

});
