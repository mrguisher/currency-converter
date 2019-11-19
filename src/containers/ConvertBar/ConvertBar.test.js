import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

import Button from '../../components/Button/Button';
import ConvertBar from './ConvertBar'

configure({adapter: new Adapter()});

// let rewire = require("rewire");

const store = configureStore([
     thunk,
 ])();


// const functionToBeCalled = require('./ConvertBar.js').__get__('getConvertedAmount')
describe('ConvertBar component', () => {
     it('button should trigger getConvertedAmount() function on click', () => {
          const wrapper = shallow(<ConvertBar store={store}></ConvertBar>).dive()
          const button = shallow(<Button onClick={() => funToBeCalled}></Button>)
          const funToBeCalled = jest.fn()
          button.simulate('click')
          expect(functionToBeCalled).toHaveBeenCalled() 
          // expect(true).toBeTruthy()
     })
})