import React from 'react';

import Button from './Button'
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'

configure({adapter: new Adapter()});

describe('Button component', () => {
     it('should contain text', () => {
          const wrapper = shallow(<Button>Convert</Button>)
          const text = wrapper.find('button').text()
          expect(text).toBe('Convert')
     })
     it('should call function on click',() => {
          let status = false
          const funToBeCalled = () => status = true
          const wrapper = shallow(<Button onClick={funToBeCalled}></Button>)
          wrapper.simulate('click')
          expect(status).toBeTruthy()
     })
})